import express from 'express';
import multer from 'multer';
import { petController } from "./index";
import multerConfig from '../../middlewares/multer/multer'

const petRouter = express.Router({ mergeParams: true });
const multerFileHandler = multer(multerConfig);

petRouter.post('/', multerFileHandler.single('photo'), async (req: express.Request, res: express.Response) => {
    return petController.create(req, res);
});

petRouter.get('/:id', async (req: express.Request, res: express.Response) => {
    return petController.show(req, res);
});

petRouter.get('/', async (req: express.Request, res: express.Response) => {
    return petController.index(req, res);
});

petRouter.put('/:id', multerFileHandler.single('photo'), async (req: express.Request, res: express.Response) => {
    return petController.update(req, res);
});

petRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    return petController.delete(req, res);
});

export default petRouter;
