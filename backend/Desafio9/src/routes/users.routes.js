import { Router } from "express";
import { createUser, getUsers } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.post("/", createUser);

export default userRouter;
