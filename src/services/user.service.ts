import { prisma } from '../core/prismaClient'
import bcrypt from 'bcryptjs'; // Importa o bcrypt para hash de senhas 
import { User } from '@prisma/client'; // Importa o tipo User do Prisma Client


type IcreateUserData = Pick < User, 'email' | 'name' | 'password'>; // Define o tipo de dados para criar um usuário, incluindo email, nome e senhad

export class UserService{
    async create ( data: IcreateUserData ):  Promise<Omit<User, 'password'>> { //define o tipo do retorno da funçao para uma promessa do tipo 'User' sem a propriedade 'password'
        

        const existsUser : User | null = await prisma.user.findUnique({where : { email: data.email}}) //verifica se ja existe aquele email

        if (existsUser) { 
            throw new Error ('Este email já esta em uso');
            
        }
        
        const encryptedPassword :string = await bcrypt.hash(data.password,10);

        const newUser = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: encryptedPassword
            }
        });



        const {password, ...userWithouPassword } = newUser;

        return userWithouPassword;

    }
}
