import { error } from 'console';
import { prisma } from '../core/prismaClient';
import { Movie, MovieList } from '@prisma/client';


interface IAddMovieData {
  listId: number;   // O ID da lista onde vamos adicionar o filme
  ownerId: number;  // O ID do dono da lista (para verificação de segurança)
  tmdbID: number;   // O ID do filme que vem da API da TMDb
  title: string;
  posterPath?: string; // O '?' torna o poster opcional
}

export class MovieService{
    public async addMovieToList(data: IAddMovieData) : Promise<Movie> {

        const listOwner: MovieList | null = await prisma.movieList.findFirst({ where: { id: data.listId, ownerId: data.ownerId } });
        if(!listOwner){
            throw new Error('Lista de filmes não encontrada ou não pertence a este utilizador.');
        }

        const movieOnList : Movie| null = await prisma.movie.findFirst({ where: { tmdbID: data.tmdbID, listId: data.listId } });
        
        if(movieOnList){
            throw new Error('Este filme já está nesta lista.');
        }

        const newMovie = await prisma.movie.create({ data: { 
            
            listId: data.listId,
            title: data.title,
            posterPath:data.posterPath,
            tmdbID: data.tmdbID

        } }); 

        return newMovie;

    }
}

