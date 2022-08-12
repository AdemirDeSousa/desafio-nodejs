# Desafio NodeJs

# Tecnologias Utilizadas

- Node
- NestJS
- Mysql
- Docker

# Requisitos

- Node v18
- Docker

# Instalação

- git clone https://github.com/AdemirDeSousa/desafio-nodejs.git
- Acessar a pasta do projeto
- Inicializar o container do Mysql

```sh
docker-compose up -d
```

- Instalar os pacotes do node

```sh
npm install
```

- Inicializar o servidor

```sh
npm run start:dev
```

- Por praticidade, deixei disponível a .env no projeto já configurada.

- Caso utilize o postman para os testes, disponibilizei um arquivo contendo exemplos das requisições do sistema para ser importado.

- Para utilizar as funcionalidades do sistema, primeiro precisa realizar o cadastro de um usuário através do endpoint:

```
Post: http://localhost:3000/api/v1/users
```

# Documentação

- Com o projeto iniciado, para visualizar a documentação, acessar a url: http://localhost:3000/api/swagger
