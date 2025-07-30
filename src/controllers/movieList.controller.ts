import { Request, Response, NextFunction } from "express";
import { MovieListService } from "../services/movieList.service";


export class MovieListController{
    private movieListService :MovieListService = new MovieListService(); 

    public create = async (req:Request,res: Response,next:NextFunction)=>{
       
        const {name}= req.body;

        if(!name){
            return res.status(400).json({message:'Por favor preencha o nome da lista'})
        }
        const ownerId = req.user?.id;
        if(!ownerId){
            return res.status(401).json({message:'erro de autenticação'})
            
        }

        try {
            const newMovieList = await this.movieListService.create({name,ownerId});
            return res.status(201).json(newMovieList);
        } catch (error) {
            if(error instanceof Error){
                return res.status(409).json({message:error.message});
            }
            return next(error);       
        }

    }

    public getMyLists = async (req:Request,res: Response,next:NextFunction)=>{
        const ownerId = req.user?.id;
        if (!ownerId) {
        // Se não houver ID, é um problema de autenticação, não do pedido.
            return res.status(401).json({ message: 'Utilizador não autenticado.' });
        }
        try {
            const myLists = await this.movieListService.getMyLists(ownerId);
            return res.status(200).json(myLists);

        } catch (error) {
            if(error instanceof Error){
                return res.status(404).json({message:error.message});
            }
            return next(error);
        }

    }





}