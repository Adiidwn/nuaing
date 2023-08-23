import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Follow } from "./Follow";
import { Like } from "./Likes";
import { Reply } from "./Replies";
import { Thread } from "./Thread";

@Entity({name:"users"})
export class User {

  @PrimaryGeneratedColumn()
  id:number;

  @Column({nullable:true})
  username: string;

  @Column({nullable:true})
  fullname: string;

  @Column({nullable:true})
  email: string;

  @Column({nullable:true})
  picture: string;

  @Column({nullable:true})
  password: string;

  @Column({nullable:true})
  description: string;

  @Column({nullable:true})
  image: string;

  

  @OneToMany(()=> Thread, (thread)=> thread.user,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  thread: Thread[];


 
  @OneToMany(()=> Like, (likes)=> likes.user,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  likes: Like[];

  @OneToMany(()=> Follow, (follows)=> follows.followers,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  followers: Follow[];
  
  @OneToMany(()=> Follow, (follows)=> follows.followings,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  followings: Follow[];
  
  @OneToMany(()=> Reply, (replies)=> replies.user,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  replies : Reply[];

  

}