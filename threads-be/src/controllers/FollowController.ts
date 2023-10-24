import { Request, Response } from "express";
import FollowService from "../service/FollowService";

class FollowController {

  // async find(req: Request, res: Response){
  //   try {
  //     const loginSession = res.locals.loginSession;
  //     const limit = (req.query.limit ?? 0) as number;
  //     const type = (req.query.type ?? "") as string;
    
  //   const response = await FollowService.find(loginSession,type,limit);
  //   return res.status(200).json(response)
  //   } catch (err) {
  //     return res.status(500).json({ error: err.message });
  //   }
  // }
  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const response = await FollowService.create(req.body,loginSession);

      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: err.message });
     
    }
  }

  async delete (req: Request, res: Response) {

    try {
      const loginSession = res.locals.loginSession
      const userId = parseInt(req.params.userId)

      const response = await FollowService.delete(loginSession, userId)
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: err.message });
     
    }
  }
}

export default new FollowController();