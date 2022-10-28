import { Request, Response } from 'express';
import {DiaryRegisterDto} from "./useCases/Register/DiaryRegisterDto";
import {validate} from "class-validator";

export class DiaryController {
    constructor(
    ) {
    }

    async create(req: Request, res: Response) {
        try {
            const ownerId = req.params.ownerId;

            const {
                petId,
                title,
                date,
                street,
                number,
                postal_code,
                neighbourhood,
            } = req.body;

            const diaryRegisterDto = new DiaryRegisterDto(
                petId,
                title,
                date,
                street,
                number,
                postal_code,
                neighbourhood,
            );

            const validationErrors = await validate(diaryRegisterDto);
            if (validationErrors.length > 0) {
                return res.status(400).json(validationErrors.map(v => v.constraints));
            }

            return res.status(201).json(diaryRegisterDto);
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