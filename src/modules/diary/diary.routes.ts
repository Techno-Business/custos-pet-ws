import express from 'express';
import { diaryController } from "./index";

const diaryRouter = express.Router({ mergeParams: true });

diaryRouter.post('/', async (req: express.Request, res: express.Response) => {
    return diaryController.create(req, res);
});

diaryRouter.get('/:id', async (req: express.Request, res: express.Response) => {
    return diaryController.show(req, res);
});

diaryRouter.get('/pets/:petId', async (req: express.Request, res: express.Response) => {
    return diaryController.index(req, res);
});

diaryRouter.get('/', async (req: express.Request, res: express.Response) => {
    return diaryController.indexOwner(req, res);
});

diaryRouter.put('/:id', async (req: express.Request, res: express.Response) => {
    return diaryController.update(req, res);
});

diaryRouter.delete('/:id/pets/:petId', async (req: express.Request, res: express.Response) => {
    return diaryController.erase(req, res);
});

diaryRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    return diaryController.delete(req, res);
});

export default diaryRouter;