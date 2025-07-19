import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
//TODO:criar uma pasta de regrea do negocio para nao compartilhar o arquivo user.service com o controler 

export class UserController{

    public async create(req: Request, res: Response, next: NextFunction){
        console.warn('1. CHEGOU NO CONTROLLER');
        const {email, name, password } = req.body;

        const  userService :UserService = new UserService(); 

        
        try{
             console.warn('2. A CHAMAR O SERVICE...');
            const newUser = await userService.create({email, name, password});
            console.warn('5. SERVICE TERMINOU, A ENVIAR RESPOSTA.');
            return res.status(201).json(newUser);

        }catch (error){
            console.error('ERRO CAPTURADO NO CONTROLLER:', error);
            if (error instanceof Error) {
                return res.status(409).json({ message: error.message });

            }
            return next(error);
        
        }
    }
    
    public async login(req: Request, res: Response, next: NextFunction){

        const {email, password} = req.body;

        const userService: UserService = new UserService();

        try{
            const userLogin= await userService.login({email,password});
            return res.status(201).json(userLogin);


        }catch(error){
            if(error instanceof Error){
                return res.status(409).json ({messege: error.message});
            }
            return next(error);
        }

    }

}