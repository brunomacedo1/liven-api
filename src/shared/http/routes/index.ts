import { Router } from "express";

import { addressesRoutes } from "./addresses.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use(usersRoutes);
router.use(authenticateRoutes);
router.use(addressesRoutes);
export { router };
