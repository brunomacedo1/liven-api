import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

// Inicializar os container do tsyringe para injeção de dependência
import "@shared/container";
import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

const app = express();
const port = process.env.PORT || 3001;

// Configuração de CORS com a lib 'cors'
app.use(cors());

// Configuração da lib 'swagger' para documentação
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Middleware para que as requisições aceitem o formato json no payload
app.use(express.json());

app.use(router);

// Tratamento de erro utilizando o express-async-errors
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

// Iniciando a aplicação na porta definida pela variável port
app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`);
});
