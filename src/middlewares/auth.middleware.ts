import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface IPayload {
  id: number;
  email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers;

    if (!authorization){
        return res.status(401).json({message: 'Token não fornecido.'});
    };

    const token = authorization.split(' ')[1];

    if (!token){
        return res.status(401).json({message: 'Token mal formatado.'});
    };

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = decoded as IPayload;
        return next();

    } catch (error){
        console.error('Falha na verificação do token:', error);
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
}
