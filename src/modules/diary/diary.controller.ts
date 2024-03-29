import { Request, Response } from 'express';
import { DiaryRegisterDto } from "./useCases/Register/DiaryRegisterDto";
import { validate } from "class-validator";
import { DiaryRegisterUseCase } from "./useCases/Register/DiaryRegisterUseCase";
import { DiaryMapper } from "./diary.mapper";
import { DiaryListUseCase } from "./useCases/List/DiaryListUseCase";
import { DiaryShowUseCase } from "./useCases/Show/DiaryShowUseCase";
import { DiaryUpdateUseCase } from "./useCases/Update/DiaryUpdateUseCase";
import { DiaryErasePetEntryUseCase } from "./useCases/Erase/DiaryErasePetEntryUseCase";
import { DiaryDeleteUseCase } from "./useCases/Delete/DiaryDeleteUseCase";
import {DiaryListFromOwnerUseCase} from "./useCases/ListFromOwner/DiaryListFromOwnerUseCase";

export class DiaryController {
    constructor(
        private diaryRegisterUseCase: DiaryRegisterUseCase,
        private diaryListUseCase: DiaryListUseCase,
        private diaryShowUseCase: DiaryShowUseCase,
        private diaryUpdateUseCase: DiaryUpdateUseCase,
        private diaryErasePetEntryUseCase: DiaryErasePetEntryUseCase,
        private diaryDeleteUseCase: DiaryDeleteUseCase,
        private diaryListFromOwnerUseCase: DiaryListFromOwnerUseCase,
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

    async show(req: Request, res: Response) {
        try {
            const ownerId = req.params.ownerId;

            const diaryId = req.params.id;

            const diary = await this.diaryShowUseCase.execute(ownerId, diaryId);
            const diaryDto = this.diaryMapper.toDto(diary);

            return res.status(200).json(diaryDto);
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

            const diaries = await this.diaryListUseCase.execute(ownerId, petId);
            const diariesDto = diaries.map((d) => this.diaryMapper.toDto(d));

            return res.status(200).json(diariesDto);
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

    async update(req: Request, res: Response) {
        try {
            const ownerId = req.params.ownerId;

            const diaryId = req.params.id;

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

            await this.diaryUpdateUseCase.execute(ownerId, diaryId, diaryRegisterDto);

            return res.status(204).json();
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

    async erase(req: Request, res: Response) {
        try {
            const ownerId = req.params.ownerId;

            const diaryId = req.params.id;

            const petId = req.params.petId;

            await this.diaryErasePetEntryUseCase.execute(ownerId, diaryId, petId);

            return res.status(204).json();
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

    async delete(req: Request, res: Response) {
        try {
            const ownerId = req.params.ownerId;

            const diaryId = req.params.id;

            await this.diaryDeleteUseCase.execute(ownerId, diaryId);

            return res.status(200).json();
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

    async indexOwner(req: Request, res: Response) {
        try {
            const ownerId = req.params.ownerId;

            const diaries = await this.diaryListFromOwnerUseCase.execute(ownerId);
            const diariesDto = diaries.map((d) => this.diaryMapper.toDto(d));

            return res.status(200).json(diariesDto);
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