### **README.md**

# MyWallet - Backend

Este é o backend do projeto MyWallet, uma API RESTful para gerenciamento de finanças pessoais. Ele permite que os usuários se cadastrem, façam login e registrem suas transações de entrada e saída.

## 🚀 Funcionalidades

  - **Cadastro de Usuário (`/sign-up`)**: Cria uma nova conta com nome, e-mail e senha. A senha é criptografada com `bcrypt`.
  - **Login de Usuário (`/sign-in`)**: Autentica o usuário e retorna um token JWT para autorização.
  - **Adição de Transação (`/transactions`)**: Permite ao usuário adicionar uma nova transação (entrada ou saída) com valor, descrição e tipo.
  - **Listagem de Transações (`/transactions`)**: Exibe todas as transações do usuário, com paginação e ordenadas por data (mais recente primeiro).
  - **Edição de Transação (`/transactions/:id`)**: Permite a atualização de uma transação existente.
  - **Remoção de Transação (`/transactions/:id`)**: Permite a exclusão de uma transação.

## 🛠️ Tecnologias Utilizadas

  - **Node.js**: Ambiente de execução JavaScript.
  - **Express**: Framework web para Node.js.
  - **MongoDB**: Banco de dados NoSQL para persistência dos dados.
  - **Mongoose**: (O seu projeto usa a lib `mongodb` diretamente)
  - **JWT (JSON Web Token)**: Para autenticação e autorização.
  - **bcrypt**: Para criptografia de senhas.
  - **Joi**: Para validação de schemas de requisição.
  - **dotenv**: Para gerenciar variáveis de ambiente.

## 🌐 Endpoints da API

A base da URL para todos os endpoints é o endereço do seu servidor (ex: `http://localhost:5000` ou a URL do seu deploy).

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/sign-up` | Cadastra um novo usuário. |
| `POST` | `/sign-in` | Autentica um usuário. |
| `POST` | `/transactions` | Adiciona uma nova transação. |
| `GET` | `/transactions` | Lista as transações do usuário. Suporta paginação via `?page=1`. |
| `PUT` | `/transactions/:id` | Edita uma transação específica. |
| `DELETE` | `/transactions/:id` | Deleta uma transação específica. |

-----

## ☁️ Deploy

  - **Link do Deploy no Render**: https://mywallt-back-end.onrender.com 
  - **Link do Banco de Dados no Mongo Atlas**: https://cloud.mongodb.com/v2/689606b19420c3472f6945cc#/clusters/detail/MyWallet
