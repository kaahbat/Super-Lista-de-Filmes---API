import { Router } from "express";
import { MovieListController } from "../controllers/movieList.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const movieListRouter = Router();
const movieListController : MovieListController = new MovieListController();

movieListRouter.post("/",authMiddleware,movieListController.create)


export {movieListRouter}