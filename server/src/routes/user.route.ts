import { Router } from "express";

import { registerUser,  deleteUserOrUsers } from "../controllers/user.controller";

const userRouter = Router()

userRouter.post("/register", registerUser)
userRouter.post("/delete",  deleteUserOrUsers)

export default userRouter