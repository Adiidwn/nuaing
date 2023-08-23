import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Like } from "../entity/Likes";

class LikeService {
  private readonly likeRepository: Repository<Like> = AppDataSource.getRepository(Like)

  async create (reqBody: any, loginSession: any): Promise<any> {
    try {
      const isLiked = await this.likeRepository.count ({
        where: {
          user: {
            id:loginSession.id,
          },
          thread: {
            id: reqBody.threadId,
          },
        },
      })

      if (isLiked >= 1) {
        throw new Error ("You already Liked this thread")
      }
      
      const like = this.likeRepository.create({
        thread: {
          id: reqBody.threadId,
        },
        user: {
          id: loginSession.id,
        },
      })
      await this.likeRepository.save(like)
      
      return {
        message: "Like Succes",
        like
      }
    }catch(err){
      throw new Error(err.message)
    }
  }

  async delete (loginSession: any, threadId: number): Promise<any> {
    try {
      const deleteLike = await this.likeRepository.findOne ({
        where: {
          user: {
            id: loginSession.id,
          },
          thread: {
            id: threadId,
          },
        },
      })
      

      if (!deleteLike) {
        throw new Error ("You un Liked this thread")
      }

      await this.likeRepository.delete({
        id: deleteLike.id
      })
      console.log("id ser",deleteLike.id)
      return {
        message: "Unlike thread succes",
        deleteLike
      }
    } catch (err) {
      throw new Error(err.message)
    }
  }
}


export default new LikeService()