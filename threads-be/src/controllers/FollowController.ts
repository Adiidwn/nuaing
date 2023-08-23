import { Request, Response } from "express";
import LikeService from "../service/LikeService";
import { log } from "console";
import FollowService from "../service/FollowService";

class FollowController {
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