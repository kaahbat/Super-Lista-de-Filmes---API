import { Request, Response, NextFunction } from "express";
import { MovieService } from "../services/movie.service";



export class MovieController {
    private movieService: MovieService = new MovieService();


    public addMovieToList = async (req:Request,res: Response,next:NextFunction)=>{
        const ownerId = req.user?.id;
        if (!ownerId) {
        // Se não houver ID, é um problema de autenticação, não do pedido.
            return res.status(401).json({ message: 'Utilizador não autenticado.' });
        }

        const listId = Number(req.params.listId);

        if(!listId){
            return res.status(400).json({message: 'lista nescessaria'});
        }

        const {tmdbID,title,posterPath} = req.body;

        if (!tmdbID ) {
            return res.status(400).json({ message: 'O campo tmdbId é obrigatório.' });
        }

        if (!title) {
            return res.status(400).json({ message: 'O campo title são obrigatório.' });
        }
        try {
            
            const movie = await this.movieService.addMovieToList({listId, ownerId,tmdbID, title, posterPath });

            return res.status(201).json({movie});

        } catch (error) {
             if(error instanceof Error){
                return res.status(404).json({message:error.message});
            }
            return next(error);
        }


    }
}