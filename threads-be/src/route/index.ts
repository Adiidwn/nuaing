import * as express from "express"
import { authenticate } from "../middlewares/auth"
import ThreadsController from "../controllers/ThreadsControll"
import AuthController from "../controllers/AuthController"
import service from "../service/service"
import { upload } from "../middlewares/uploadFile"

import LikeController from "../controllers/LikeController"
import ReplyController from "../controllers/ReplyController"
import FollowController from "../controllers/FollowController"

const router = express.Router()
// const router = express({dest: './uploads'})

router.get("/", (req,res) =>{
  res.send("hello from v1")


})

router.get("/thread/", authenticate, ThreadsController.find)
router.get("/thread/:id", authenticate, ThreadsController.findOne)
// router.get("/detail/:id",authenticate, ThreadsController.DetailList)
router.post("/thread/",authenticate,upload('image'), ThreadsController.create)
router.delete("/thread/:id", authenticate, ThreadsController.delete)
router.patch("/thread/:id", ThreadsController.update)

router.post("/auth/register", AuthController.register)
router.get("/auth", AuthController.find)
router.post("/auth/signin", AuthController.login)
router.get("/auth/check", authenticate, AuthController.check)
router.post("/auth/edit", authenticate, AuthController.editProfile)
 
// router.get("/reply",authenticate,ReplyController.find)
// router.post("/reply",authenticate, ReplyController.create)

// router.post("/like",authenticate, LikeController.create)
// router.delete("/like/:threadId",authenticate, LikeController.delete)
  
// // router.get("/follow", authenticate, FollowController.find);
// router.post("/follow",authenticate, FollowController.create)
// router.delete("/unfollow/:userId",authenticate, FollowController.delete)

export default router