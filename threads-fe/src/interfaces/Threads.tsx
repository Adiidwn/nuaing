import { User } from "@/layouts/ThreadCard";

export interface IDeleteThread {
  image?: string;
  content?: string;
  
  }

  export interface ICommentThread {
    id?: number;
    content?: string;
    image?: string;
    postedAt?: string;
    likes?: number;
    reply?: number;
    user?: User;
  }

  export interface ILikeThread {
    id?: number;
    content?: string;
    image?: string;
    postedAt?: string;
    likes: number;
    reply?: number;
    user?: User; 
    isLiked: boolean;
  }
  