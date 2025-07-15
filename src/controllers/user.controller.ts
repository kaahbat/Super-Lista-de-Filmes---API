import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";


export class UserController{

    async create(req: Request, res: Response, next: NextFunction){
        const {email, name, password } = req.body;

        const  userService :UserService = new UserService(); 

        
        try{
            
            const newUser = await userService.create({email, name, password});

            return res.status(201).json(newUser);


        }catch (error){
            if (error instanceof Error) {
                return res.status(409).json({ message: error.message });

            }
            return next(error);
        
        }
    }
}