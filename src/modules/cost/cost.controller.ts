import { Request, Response } from 'express';

export class CostController {
    constructor() {
    }

    create(req: Request, res: Response) {
        try {

            return res.status(200).json("hello there.");
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