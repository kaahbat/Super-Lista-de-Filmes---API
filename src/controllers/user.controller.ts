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
            return res.status(200).json(userLogin);


        }catch(error){
            if(error instanceof Error){
                return res.status(401).json ({messege: error.message});
            }
            return next(error);
        }

    }

    public async getMyProfile(req: Request, res: Response, next: NextFunction) {

        const  userService :UserService = new UserService(); 

        const userId = req.user?.id;

        if(!userId){
            return res.status(401).json ({messege: 'Utilizador Invalido.'});
        }

        try {
            
            const myUser = await userService.getProfileById(userId);
            return res.status(200).json(myUser)

        } catch (error) {
            if (error instanceof Error) {
                
                return res.status(404).json({ message: error.message });
            }
            return next(error);
        }



    }    
}