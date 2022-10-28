import express from 'express';
import { diaryController } from "./index";

const diaryRouter = express.Router({ mergeParams: true });

diaryRouter.post('/', async (req: express.Request, res: express.Response) => {
    return diaryController.create(req, res);
});

export default diaryRouter;