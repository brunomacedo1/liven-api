import "reflect-metadata";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import handleErrors from "@utils/handleErrors";

import swaggerFile from "../../../swagger.json";

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());

app.use(() => handleErrors);

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`);
});
