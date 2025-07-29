import { prisma } from '../core/prismaClient'
import bcrypt from 'bcryptjs'; // Importa o bcrypt para hash de senhas 
import { User } from '@prisma/client'; // Importa o tipo User do Prisma Client
import jwt from 'jsonwebtoken';



type IcreateUserData = Pick < User, 'email' | 'name' | 'password'>; // Define o tipo de dados para criar um usuário, incluindo email, nome e senhad

type IloginUserData = Pick < User,'email'|'password' >;

type ITokenUser = { token: string; user: Omit<IcreateUserData, 'password'>  }  

export class UserService{
    public async create ( data: IcreateUserData ):  Promise<Omit<User, 'password'>> { //define o tipo do retorno da funçao para uma promessa do tipo 'User' sem a propriedade 'password'
        console.warn('3. CHEGOU NO SERVICE');

        console.warn('4. A VERIFICAR O UTILIZADOR NO BANCO DE DADOS...');
        const existsUser : User | null = await prisma.user.findUnique({where : { email: data.email}}) //verifica se ja existe aquele email
        console.warn('   -> UTILIZADOR VERIFICADO.');

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

    

    public async login (data: IloginUserData): Promise<ITokenUser> {
        const userValid : User | null = await prisma.user.findUnique({where : {email: data.email}});
        
        if(!userValid){
            throw new Error ('E-mail ou senha inválidos.');

        }
        const validatedPassword  = await bcrypt.compare(data.password ,  userValid.password);
        
        if(!validatedPassword){
            throw new Error ('E-mail ou senha inválidos.');
        }

        const token = jwt.sign(
            {
                id: userValid.id,
                email: userValid.email,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '1h'
            }
        );
        
        const user: Omit<IcreateUserData, 'password'> = {
            email: userValid.email,
            name: userValid.name
        }

        const userToken = {
            token,
            user
        }
        
        
        return userToken;

    }

    public async getProfileById(id:number){
        const userByID : User | null = await prisma.user.findUnique({where : {id}});
        if(!userByID){
            throw new Error ('Utilizador não encontrado.');
        }

        const {password, ...userWithouPassword } = userByID;

        return userWithouPassword


    }
}
