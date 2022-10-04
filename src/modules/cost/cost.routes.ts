import express from 'express';
import { costController } from "./index";

const costRouter = express.Router();

costRouter.post('/', async (req: express.Request, res: express.Response) => {
    return costController.create(req, res);
});

export default costRouter;