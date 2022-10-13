import express from 'express';

import { ownerController } from "./index";

const ownerRouter = express.Router();

ownerRouter.post('/signup', async (req: express.Request, res: express.Response) => {
    return ownerController.signUp(req, res);
});

ownerRouter.post('/signin', async (req: express.Request, res: express.Response) => {
    return ownerController.signIn(req, res);
});

export default ownerRouter;
