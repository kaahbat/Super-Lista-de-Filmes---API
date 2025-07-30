import { Router } from "express";
import { MovieListController } from "../controllers/movieList.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { MovieController } from "../controllers/movie.controller";

const movieListRouter = Router();
const movieListController : MovieListController = new MovieListController();
const movieController:MovieController = new MovieController();

movieListRouter.post("/",authMiddleware,movieListController.create);
movieListRouter.get("/",authMiddleware, movieListController.getMyLists);
movieListRouter.post("/:listId/movies", authMiddleware, movieController.addMovieToList);
export {movieListRouter}