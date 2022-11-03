import { ProcessCredentials } from 'aws-sdk';
import express from 'express';
import { sendMail } from '../../infra/email';

import { ownerController } from "./index";

const ownerRouter = express.Router();

ownerRouter.post('/signup', async (req: express.Request, res: express.Response) => {
    return ownerController.signUp(req, res);
});

ownerRouter.post('/signin', async (req: express.Request, res: express.Response) => {
    return ownerController.signIn(req, res);
});

ownerRouter.get('/recover', async (req: express.Request, res: express.Response) => {

    const {response, body} = await sendMail({
        fromEmail:'viniciusecortez@outlook.com',
        fromName: 'Vinicius',
        subject: 'Test test',
        text: 'Um belo texto',
        recepients: [{Email: 'viniciusecortez@gmail.com'}]}
    );
    
    return res.status(response.status).json(body);
    
});


export default ownerRouter;
