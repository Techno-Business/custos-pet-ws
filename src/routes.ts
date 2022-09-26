import { Router } from "express";
import ownerRoutes from "./modules/owner/owner.routes";

const apiV1Routes = Router();

apiV1Routes.use('/owner', ownerRoutes);

export { apiV1Routes };