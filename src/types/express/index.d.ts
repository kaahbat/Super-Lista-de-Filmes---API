// Importa a nossa interface IPayload para que possamos usá-la aqui
import { IPayload } from '../../middlewares/auth.middleware';

// Declara um novo módulo para estender o namespace original do Express
declare global {
  namespace Express {
    // Estende a interface Request original
    export interface Request {
      // Adiciona a nossa nova propriedade 'user'
      // Ela é opcional (?) porque nem todas as requisições terão um utilizador (apenas as autenticadas)
      user?: IPayload;
    }
  }
}
