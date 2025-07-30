
import { error } from 'console';
import { prisma } from '../core/prismaClient';
import { MovieList } from '@prisma/client';

interface ICreateMovieListData {
  name: string;
  ownerId: number;
}


export class MovieListService{

    public async create(data: ICreateMovieListData  ) :Promise<MovieList> {

        const existList : MovieList | null = await prisma.movieList.findFirst({ where :{name: data.name, ownerId: data.ownerId}})

        if(existList){
            throw new Error('Você já tem uma lista com este nome.');
        }

        const newList = await prisma.movieList.create({data:{
            name: data.name,
            ownerId: data.ownerId
        }})

        return newList

    }

    public async getMyLists(ownerId:number): Promise<MovieList[]> {
        
        const myListsByID : MovieList[] | [] = await prisma.movieList.findMany({where: {ownerId: ownerId}});

        return myListsByID;


    }




}
