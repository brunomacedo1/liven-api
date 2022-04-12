import { Router } from "express";

import { CreateAddressController } from "@modules/addresses/useCases/createAddress/CreateAddressController";
import { UpdateAddressController } from "@modules/addresses/useCases/updateAddress/UpdateAddressController";

const addressesRoutes = Router();

const createAddressController = new CreateAddressController();
const updateAddressController = new UpdateAddressController();

addressesRoutes.post("/users/address", createAddressController.handle);
addressesRoutes.patch("/users/address", updateAddressController.handle);

export { addressesRoutes };
