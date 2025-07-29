import { Router } from "express";
import { userRoutes } from "./user.routes";
import { movieListRouter } from "./movieList.routes"


const routes = Router();

routes.use("/users", userRoutes);
routes.use("/movie-lists",movieListRouter)


export {routes};