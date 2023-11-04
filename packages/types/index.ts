type messagePayload = {
  id?: string;
  message: string;
};

export type message = {
  type: string;
  payload: messagePayload;
};

export type TcreateRoom = {
  name: string;
};
