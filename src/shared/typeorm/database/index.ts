import { DataSource, DataSourceOptions } from "typeorm";

// Configurações para o banco de dados em questão
const postgresDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "liven-api",
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"], // Caminho para os arquivos .ts onde estão as classes marcadas como @Entity()
  migrations: ["./src/shared/typeorm/database/migrations/*.ts"], // Caminho para as 'migrations'
};

const dataSource = new DataSource(postgresDataSourceOptions);

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export { dataSource };
