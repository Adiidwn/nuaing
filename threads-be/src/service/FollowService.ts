import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Like } from "../entity/Likes";
import { Request, Response } from "express";
import { Follow } from "../entity/Follow";
import { User } from '../entity/User';

class FollowService {
  private readonly followRepository: Repository<Follow> = AppDataSource.getRepository(Follow)

  async create (reqBody: any, loginSession: any): Promise<any> {
    try {
      const isFollow = await this.followRepository.count ({
        where: {
          followers: {
            id:loginSession.id,
          },
          followings: {
            id: reqBody.userId,
          },
        },
      })
      
      if (isFollow >= 1) {
        throw new Error ("You already follow this user")
      }
      
      const follow = this.followRepository.create({
        followers: {
          id: loginSession.id,
        },
        followings: {
          id: reqBody.userId,
        },
      })
    
      await this.followRepository.save(follow)
      return {
        message: "follow Succes",
        follow
      }
    }catch(err){
      throw new Error(err.message)
    }
  }

  async delete (loginSession: any, userId: any): Promise<any> {
    try {
      const deleteFollow = await this.followRepository.findOne ({
        where: {
          followers: {
            id: loginSession.id,
          },
          followings: {
            id: userId,
          },
        },
      })

      if (!deleteFollow) {
        throw new Error ("You Unfolow this user")
      }

      await this.followRepository.delete({
        id: deleteFollow.id
      })
    
      return {
        message: "Unfollow user succes",
        deleteFollow
      }
    } catch (err) {
      throw new Error(err.message)
    }
  }
}


export default new FollowService()