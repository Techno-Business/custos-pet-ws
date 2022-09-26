import { Request, Response } from 'express';
import { OwnerDto } from "./owner.dto";

export class OwnerController {
    constructor() {
    }

    async signUp(req: Request, res: Response): Promise<Response<OwnerDto>> {
        try {
            return res.status(201).json("hello there");
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