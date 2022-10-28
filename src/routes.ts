import { Router } from "express";
import ownerRoutes from "./modules/owner/owner.routes";
import petRoutes from "./modules/pet/pet.routes";
import costRoutes from "./modules/cost/cost.routes";
import diaryRoutes from './modules/diary/diary.routes';

const apiV1Routes = Router();

apiV1Routes.use('/owner', ownerRoutes);
apiV1Routes.use('/owner/:ownerId/pets', petRoutes);
apiV1Routes.use('/owner/:ownerId/costs', costRoutes);
apiV1Routes.use('/owner/:ownerId/diaries', diaryRoutes);

export { apiV1Routes };