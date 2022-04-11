import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserControlle";
import { DeleteUserController } from "@modules/users/useCases/deleteUserAdress/DeleteUserController";
import { GetUserController } from "@modules/users/useCases/getUser/GetUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

// Instâncias para os métodos que lidam com os uses cases
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const getUserController = new GetUserController();
const deleteUserController = new DeleteUserController();

// Endpoints referentes ao modulo de usuário(CRUD)
usersRoutes.use(ensureAuthenticated);
usersRoutes.get("/users", getUserController.handle);
usersRoutes.post("/users", createUserController.handle);
usersRoutes.patch("/users", updateUserController.handle);
usersRoutes.delete("/users", deleteUserController.handle);
export { usersRoutes };
