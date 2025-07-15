
import express from 'express';
import cors from 'cors';

class App{
    public server: express.Application;

    constructor (){
        this.server=express();
        this.middlewares();
        this.routes();

    }
    private middlewares(): void {
        this.server.use(express.json,cors);
    }

    private routes(){

    }


    
}
export default new App().server;