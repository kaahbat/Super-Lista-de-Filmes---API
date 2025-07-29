import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from '../middlewares/auth.middleware'; 

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/register", userController.create);
userRoutes.post("/login", userController.login);
userRoutes.get("/me",authMiddleware, userController.getMyProfile)

export {userRoutes};