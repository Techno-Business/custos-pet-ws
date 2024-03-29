import express from 'express';
import { costController } from "./index";

const costRouter = express.Router({ mergeParams: true });

costRouter.post('/', async (req: express.Request, res: express.Response) => {
    return costController.create(req, res);
});

costRouter.get('/:id', async (req: express.Request, res: express.Response) => {
   return costController.show(req, res);
});

costRouter.get('/pets/:petId', async (req: express.Request, res: express.Response) => {
   return costController.index(req, res);
});

costRouter.get('/', async (req: express.Request, res: express.Response) => {
    return costController.indexOwner(req, res);
});

costRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    return costController.delete(req, res);
});

export default costRouter;