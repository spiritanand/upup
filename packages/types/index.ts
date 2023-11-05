type messagePayload = {
  id?: string;
  message: string;
  upvotes: number;
};

export type message = {
  type: string;
  payload: messagePayload;
};

export type TcreateRoom = {
  name: string;
};
