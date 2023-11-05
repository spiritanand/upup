import { Redis } from "ioredis";
import { message as TMessage } from "types";
import { v4 as uuidv4 } from "uuid";

export class RedisPubSubManager {
  private static instance: RedisPubSubManager; // singleton instance
  private subscriber: Redis; // subscribe to channels
  private publisher: Redis; // publish to channels. This is a separate instance from subscriber
  private subscriptions: Map<
    string,
    { [room: string]: { room: string; upvoted: string[] } }
  >;
  // userId -> { room -> { room, upvoted } }
  // eg, { 1: { room1: { room: room1, upvoted: ["message1", "message2"] }, room2: { room: room2, upvoted: ["message12"] } } }
  private reverseSubscriptions: Map<
    string,
    { [userId: string]: { userId: string; ws: WebSocket } }
    // room -> { room -> { userId, ws } }
    // eg, { room1: { 1: { userId: 1, ws: ws1 }, 2: { userId: 2, ws: ws2 } } }
  >;

  // instantiate this class using private constructor
  private constructor() {
    this.subscriber = new Redis();
    this.publisher = new Redis();

    this.subscriptions = new Map<
      string,
      { [room: string]: { room: string; upvoted: string[] } }
    >();
    this.reverseSubscriptions = new Map<
      string,
      { [userId: string]: { userId: string; ws: any } }
    >();

    //   forward message to all subscribers of the channel
    this.subscriber.on("message", (channel, message) => {
      console.log(`Received ${message} from ${channel}`);

      const subscribers = this.reverseSubscriptions.get(channel) || {};

      Object.values(subscribers).forEach(({ ws }) => ws.send(message));
    });
  }

  static getInstance() {
    if (!this.instance) this.instance = new RedisPubSubManager();

    return this.instance;
  }

  subscribe(userId: string, room: string, ws: any) {
    // Add room to user's subscriptions
    this.subscriptions.set(userId, {
      ...(this.subscriptions.get(userId) || {}),
      [room]: { room, upvoted: [] },
    });

    // Add user to room's subscribers
    this.reverseSubscriptions.set(room, {
      ...(this.reverseSubscriptions.get(room) || {}),
      [userId]: { userId, ws },
    });

    // If this is the 1st subscriber to this room, subscribe to the room
    if (Object.keys(this.reverseSubscriptions.get(room) || {})?.length === 1) {
      console.log(`subscribing messages from ${room}`);

      this.subscriber.subscribe(room, (err, count) => {
        if (err) {
          console.error("Failed to subscribe: %s", err.message);
        } else {
          console.log(
            `Subscribed successfully! This client is currently subscribed to ${count} channels.`,
          );
        }
      });
    }
  }

  unsubscribe(userId: string, room: string) {
    if (!userId || !room || !this.subscriptions.get(userId)) return;

    // Remove room from user's subscriptions
    const userSubscriptions = this.subscriptions.get(userId);
    if (userSubscriptions) {
      delete userSubscriptions[room];

      // If user has no more subscriptions, remove user from subscriptions
      if (Object.keys(userSubscriptions).length === 0) {
        this.subscriptions.delete(userId);
      }
    }

    // Remove user from room's subscribers
    delete this.reverseSubscriptions.get(room)?.[userId];

    // If room has no more subscribers, unsubscribe from it
    if (
      !this.reverseSubscriptions.get(room) ||
      Object.keys(this.reverseSubscriptions.get(room) || {}).length === 0
    ) {
      console.log("unsubscribing from " + room);
      this.subscriber.unsubscribe(room);
      this.reverseSubscriptions.delete(room);
    }

    console.log({
      subs: this.subscriptions,
      revSubs: this.reverseSubscriptions,
    });
  }

  async sendMessage(room: string, message: string) {
    this.publish(room, {
      type: "message",
      payload: {
        id: uuidv4(),
        message,
        upvotes: 0,
      },
    });
  }

  async upvoteMessage(room: string, userId: string, messageId: string) {}

  publish(room: string, message: TMessage) {
    console.log(`publishing message to ${room}`);
    this.publisher.publish(room, JSON.stringify(message));
  }
}
