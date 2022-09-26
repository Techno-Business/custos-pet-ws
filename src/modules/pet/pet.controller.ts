import { Request, Response } from 'express';

export class PetController {
    async register(req: Request, res: Response) {
        try {
            console.log(req.params);
            console.log(req.params.ownerId);

            return res.status(201).json("hello there.");
        } catch (e) {
            console.log(e);
            if (e instanceof Error) {
                return res.status(400).json({
                    message: e.message
                });
            } else {
                return res.status(400).json('An unexpected error has occurred.');
            }
        }
    }
}