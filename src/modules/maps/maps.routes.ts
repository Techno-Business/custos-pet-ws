import express from "express";
import { mapsController } from "./index";

const mapsRouter = express.Router({ mergeParams: true });

mapsRouter.get('/search', async (req: express.Request, res: express.Response) => {
    return mapsController.searchPlaces(req, res);
});

export default mapsRouter;