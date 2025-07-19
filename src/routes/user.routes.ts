import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/register", userController.create);
userRoutes.post("/login", userController.login);

export {userRoutes};