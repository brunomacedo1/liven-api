import { DataSource, DataSourceOptions } from "typeorm";

const postgresDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "bruno",
  password: "123456",
  database: "liven-api",
  entities: ["path-to-entities"],
  migrations: ["path-to-migrations"],
};

const dataSource = new DataSource(postgresDataSourceOptions);

dataSource.initialize();

export { dataSource };
