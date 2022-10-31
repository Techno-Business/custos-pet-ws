import { Request, Response } from 'express';
import { DiaryRegisterDto } from "./useCases/Register/DiaryRegisterDto";
import { validate } from "class-validator";
import { DiaryRegisterUseCase } from "./useCases/Register/DiaryRegisterUseCase";
import { DiaryMapper } from "./diary.mapper";
import { DiaryListUseCase } from "./useCases/List/DiaryListUseCase";

export class DiaryController {
    constructor(
        private diaryRegisterUseCase: DiaryRegisterUseCase,
        private diaryListUseCase: DiaryListUseCase,
        private diaryMapper: DiaryMapper,
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

            const diary = await this.diaryRegisterUseCase.execute(ownerId, diaryRegisterDto);
            const diaryDto = this.diaryMapper.toDto(diary);

            return res.status(201).json(diaryDto);
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

    async index(req: Request, res: Response) {
        try {
            const ownerId = req.params.ownerId;

            const petId = req.params.petId;

            const diaries = this.diaryListUseCase.execute(ownerId, petId);

            return res.status(200).json(diaries);
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