# Super Lista de Filmes - API

API RESTful para a aplicação "Super Lista de Filmes", um projeto de portfólio para demonstrar a construção de um backend robusto com autenticação, gestão de dados e integração com APIs externas.

## ✨ Funcionalidades

- **Autenticação de Utilizadores:** Sistema completo de registo e login com tokens de acesso **JWT**.
- **Gestão de Listas de Filmes:** Utilizadores autenticados podem criar e visualizar as suas próprias listas de filmes personalizadas.
- **Gestão de Filmes:** Utilizadores autenticados podem adicionar e remover filmes das suas listas, guardando referências de uma API externa (a TMDb).
- **Rotas Protegidas:** Uso de middleware para garantir que apenas utilizadores autenticados possam aceder e modificar os seus próprios dados.

## 🚀 Começar

Siga os passos abaixo para executar o projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Postman](https://www.postman.com/downloads/) ou qualquer outro cliente API para testar os endpoints


### ⚙️ Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/kaahbat/Super-Lista-de-Filmes---API.git
    cd Super-Lista-de-Filmes---API
    ```

2.  **Crie o ficheiro de ambiente:**
    - Crie um novo ficheiro `.env` na raiz do projeto.
    - Preencha as variáveis de ambiente necessárias. Para começar, use as seguintes:
      ```env
      # Configuração do Banco de Dados para Prisma e Docker
      DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5438/postgres?schema=public"
      DB_USER=postgres
      DB_PASSWORD=mysecretpassword
      DB_NAME=postgres
      
      # Segredo para gerar os tokens JWT
      JWT_SECRET="seu-segredo-super-secreto-aqui"
      ```
    - *Lembre-se de usar a porta que funcionou para si (ex: `5438`).*

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o banco de dados com Docker:**
    ```bash
    docker-compose up -d
    ```

5.  **Execute as migrações do Prisma:**
    Este comando vai criar as tabelas no seu banco de dados com base no `schema.prisma`.
    ```bash
    npx prisma migrate dev
    ```

6.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

O servidor estará a rodar em `http://localhost:4139` (ou na porta que você configurou).


## Endpoints da API

A base URL para todos os endpoints é `/api`.

| Método | Rota                          | Descrição                                       | Autenticação  |
| :----- | :---------------------------- | :-------------------------------------------    | :------------ |
| `POST` | `/users/register`             | Regista um novo utilizador.                     | Não           |
| `POST` | `/users/login`                | Autentica um utilizador e retorna um token JWT. | Não           |
| `GET`  | `/users/me`                   | Retorna o perfil do utilizador autenticado.     | **Requerida** |
| `POST` | `/movie-lists`                | Cria uma nova lista de filmes.                  | **Requerida** |
| `GET`  | `/movie-lists`                | Retorna todas as listas de filmes do utilizador.| **Requerida** |
| `POST` | `/movie-lists/:listId/movies` | Adiciona um filme a uma lista específica.       | **Requerida** |