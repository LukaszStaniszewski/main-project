import { Router } from "express";

import {
   deleteUserOrUsers,
   updateUserOrUsers,
   sendUsers,
   registerAndSignIn,
   // sendUser,
   getCurrentUser,
} from "../controllers/user.controller";
import requireUser from "../middleware/requireUser";

const userRouter = Router();

userRouter.post("/register", registerAndSignIn);
userRouter.post("/delete", requireUser, deleteUserOrUsers);
userRouter.patch("/", requireUser, updateUserOrUsers);
userRouter.get("/", sendUsers);
userRouter.get("/current", requireUser, getCurrentUser);

export default userRouter;
