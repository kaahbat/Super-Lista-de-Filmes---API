
import express from 'express';
import cors from 'cors';
import { routes } from '../routes';

class App{
    public server: express.Application;

    constructor (){
        this.server=express();
        this.middlewares();
        this.routes();

    }
    private middlewares(): void {
        this.server.use(cors());
        this.server.use(express.json());
    }

    private routes(){
        this.server.use('/api', routes);
    }


    
}
export default new App().server;