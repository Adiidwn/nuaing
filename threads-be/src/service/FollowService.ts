import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Follow } from "../entity/Follow";
import { User } from '../entity/User';

class FollowService {
  private readonly followRepository: Repository<Follow> = AppDataSource.getRepository(Follow)

  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User)

  // async find (loginSession: any, queryType?: string, queryLimit?: number): Promise<any> {
  //   try {
  //     let follows: Follow[] 

  //     if (queryType === "followed") {
  //       follows = await this.followRepository.find({
  //         take: queryLimit,
  //         where: {
  //           follower: {
  //             id: loginSession.id,
  //           },
  //         },
  //         relations: ["follower","followed"],
  //       });

  //       return follows.map((follow) => ({
  //         id: follow.id,
  //         userId: follow.followed.id,
  //         username: follow.followed.username,
  //         fullname: follow.followed.fullname,
  //         email: follow.followed.email,
  //         picture: follow.followed.picture,
  //         description: follow.followed.description,
  //         isFollow: true,
  //       }));
  //     } else if (queryType === "followed") {
  //       follows = await this.followRepository.find({
  //         take: queryLimit,
  //         where: {
  //           followed: {
  //             id: loginSession.id,
  //           },
  //         },
  //         relations: ["followed","follower"]
  //       }),
         
  //       return await Promise.all(
  //         follows.map(async (follow) => {
  //           const isFollowed = await this.followRepository.count({
  //             where: {
  //               follower: {
  //                 id: loginSession.user.id,
  //               },
  //               followed: {
  //                 id: follow.follower.id,
  //               },
  //             },
  //           });   
            

  //           return {
  //             id: follow.id,
  //             userId: follow.follower.id,
  //             username: follow.follower.username,
  //             fullname: follow.follower.fullname,
  //             email: follow.follower.email,
  //             picture: follow.follower.picture,
  //             description: follow.follower.description,
  //             isFollow: isFollowed > 0,
  //           };
  //         })
  //       );
  //     }

  //     return {
  //       message: `Please specify valid query "type" (follower / followed) `
  //     };
  //   } catch (err) {
  //     throw new Error(err.message);
  //   }
  // }


  async create (reqBody: any, loginSession: any): Promise<any> {
    try {
      const isFollow = await this.followRepository.count ({
        where: {
          follower: {
            id:loginSession.id,
          },
          followed: {
            id: reqBody.userId,
          },
        },
      })
      
      if (isFollow >= 1) {
        throw new Error ("You already follow this user")
      }
      
      const follow = this.followRepository.create({
        follower: {
          id: loginSession.id,
        },
        followed: {
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
          follower: {
            id: loginSession.id,
          },
          followed: {
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