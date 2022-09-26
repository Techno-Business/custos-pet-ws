import { Router } from "express";
import ownerRoutes from "./modules/owner/owner.routes";
import petRoutes from "./modules/pet/pet.routes";

const apiV1Routes = Router();

apiV1Routes.use('/owner', ownerRoutes);
apiV1Routes.use('/owner/:ownerId/pets', petRoutes);

export { apiV1Routes };