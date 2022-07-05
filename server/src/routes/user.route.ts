import { Router } from "express";

import {deleteUserOrUsers, updateUserOrUsers, sendUsers, registerAndSignIn, sendUser} from "../controllers/user.controller";

const userRouter = Router()

userRouter.post("/register", registerAndSignIn)
userRouter.post("/delete",  deleteUserOrUsers)
userRouter.post("/", sendUser)
userRouter.patch("/",  updateUserOrUsers)
userRouter.get("/", sendUsers)

export default userRouter