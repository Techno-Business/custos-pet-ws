import { ProcessCredentials } from 'aws-sdk';
import express from 'express';
import { sendMail } from '../../infra/email';
import Owner from '../../infra/sequelize/models/Owner';
import { OwnerRepository } from '../../infra/sequelize/repositories/OwnerRepository';
import OwnerSequelizeModel from '../../infra/sequelize/models/Owner';


import { ownerController } from "./index";

const ownerRouter = express.Router();

ownerRouter.post('/signup', async (req: express.Request, res: express.Response) => {
    return ownerController.signUp(req, res);
});

ownerRouter.post('/signin', async (req: express.Request, res: express.Response) => {
    return ownerController.signIn(req, res);
});

ownerRouter.post('/recover', async (req: express.Request, res: express.Response)=>{
    return ownerController.recover(req, res);
});


export default ownerRouter;
