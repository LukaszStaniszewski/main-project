import { Router } from "express";

import {deleteUserOrUsers, updateUserOrUsers, sendUsers, registerAndSignIn} from "../controllers/user.controller";

const userRouter = Router()

userRouter.post("/register", registerAndSignIn)
userRouter.post("/delete",  deleteUserOrUsers)
userRouter.patch("/",  updateUserOrUsers)
userRouter.get("/", sendUsers)

export default userRouter