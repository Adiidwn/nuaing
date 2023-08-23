import { IUser } from "./User";


export interface IReply {
  id?: number;
  content?: string;
  user: IUser;
}

export interface IReplyPost {
  content?: string;
  threadId?: number;
}