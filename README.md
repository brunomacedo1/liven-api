<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>


<br>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [Jest](https://jestjs.io/pt-BR/)

## 💻 Projeto 

Api criada para o desafio tecnico da empresa Liven


## 🚀 Como executar

- Instale o node versão LTS(16.14.0)
- Com o node instalado, utilize o comando `corepack enable` para habilitar o yarn.
- Clone o repositório
- Navega para a pasta da aplicação e rode o comando `yarn` para instalar as dependências.
- É necessário ter o postgres(rodando na porta 5432) e um banco de dados com nome de liven-api criado em seu localhost.(https://www.postgresql.org/)
- Na pasta shared/typeorm/database, no arquivo index.ts está a configuração do nosso orm(que faz a conexão com o banco), altere o username e password, para seu usuário e senha de acesso ao postgres. 
```
  const postgresDataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres", // Alterar para seu usuário de acesso ao postgres
    password: "password", // Alterar para sua senha de acesso ao postgres
    database: "liven-api",
    entities: ["./src/modules/**/infra/typeorm/entities/*.ts"], // Caminho para os arquivos .ts onde estão as classes marcadas como @Entity()
    migrations: ["./src/shared/typeorm/database/migrations/*.ts"], // Caminho para as 'migrations'
  };
```
- Utilize yarn migration para criar as tabelas no banco.
- Utilize o comando `yarn dev` para rodar a aplicação.

##  Rota da documentação
- http://localhost:3333/api-docs -> Documentação da api feita com swagger ui
