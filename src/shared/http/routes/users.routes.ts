import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserControlle";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();

usersRoutes.post("", createUserController.handle);
usersRoutes.patch("", updateUserController.handle);
export { usersRoutes };
