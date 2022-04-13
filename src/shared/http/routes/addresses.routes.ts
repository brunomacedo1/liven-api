import { Router } from "express";

import { CreateAddressController } from "@modules/addresses/useCases/createAddress/CreateAddressController";
import { GetAddressesController } from "@modules/addresses/useCases/getAddresses/GetAddressesController";
import { GetAddressByIdController } from "@modules/addresses/useCases/getAdressById/GetAddressByIdController";
import { UpdateAddressController } from "@modules/addresses/useCases/updateAddress/UpdateAddressController";

const addressesRoutes = Router();

const createAddressController = new CreateAddressController();
const updateAddressController = new UpdateAddressController();
const getAddressesController = new GetAddressesController();
const getAddressByIdController = new GetAddressByIdController();

addressesRoutes.get("/users/address", getAddressesController.handle);
addressesRoutes.get("/users/address/:id", getAddressByIdController.handle);
addressesRoutes.post("/users/address", createAddressController.handle);
addressesRoutes.patch("/users/address", updateAddressController.handle);

export { addressesRoutes };
