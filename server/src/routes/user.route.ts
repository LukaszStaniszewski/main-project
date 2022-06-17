import { Router } from "express";

import { registerUser, deleteUserOrUsers, updateUserOrUsers } from "../controllers/user.controller";

const userRouter = Router()

userRouter.post("/register", registerUser)
userRouter.post("/delete",  deleteUserOrUsers)
userRouter.patch("/patch",  updateUserOrUsers)

export default userRouter