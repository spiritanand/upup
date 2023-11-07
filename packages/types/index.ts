type messagePayload = {
  id?: string;
  message: string;
  sender?: string;
  upvotes?: number;
};

export type message = {
  type: string;
  payload: messagePayload;
};

export type TcreateRoom = {
  name: string;
};
