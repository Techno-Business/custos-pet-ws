import { Request, Response } from 'express';
import { PetRegisterDto } from "./useCases/Register/PetRegisterDto";
import { validate } from "class-validator";
import { PetRegisterUseCase } from "./useCases/Register/PetRegisterUseCase";
import { PetShowUseCase } from "./useCases/Show/PetShowUseCase";
import { PetMapper } from "./pet.mapper";
import { PetListUseCase } from "./useCases/List/PetListUseCase";
import { PetRemoveUseCase } from "./useCases/Remove/PetRemoveUseCase";
import { PetEditUseCase } from "./useCases/Edit/PetEditUseCase";

export class PetController {
    constructor(
        private petRegisterUseCase: PetRegisterUseCase,
        private petShowUseCase: PetShowUseCase,
        private petListUseCase: PetListUseCase,
        private petRemoveUseCase: PetRemoveUseCase,
        private petEditUseCase: PetEditUseCase,
        private petMapper: PetMapper,
    ) {
    }

    async create(req: Request, res: Response) {
        try {
            const { name, age, sex, species, breed } = req.body;
            const ownerId = req.params.ownerId;

            //TODO: remove age number assertion/parsing
            const petRegisterDto = new PetRegisterDto(
                name,
                +age,
                sex,
                species,
                breed,
                ownerId,
            );

            const validationErrors = await validate(petRegisterDto);
            if (validationErrors.length > 0) {
                return res.status(400).json(validationErrors.map(v => v.constraints));
            }

            const reqPhotoFile = req.file;

            const pet = await this.petRegisterUseCase.execute(petRegisterDto, reqPhotoFile);
            const petDto = this.petMapper.toDto(pet);

            return res.status(201).json(petDto);
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
            const petId = req.params.id;

            const pet = await this.petShowUseCase.execute(petId);
            const petDto = this.petMapper.toDto(pet);

            return res.status(200).json(petDto);
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
            const pets = await this.petListUseCase.execute(ownerId);
            const petsDto = pets.map((p) => this.petMapper.toDto(p));

            return res.status(200).json(petsDto);
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
            const petId = req.params.id;

            await this.petRemoveUseCase.execute(petId);

            return res.status(200).json('Pet successfully deleted');
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
            console.log(req.body);
            const {name, age, sex, species, breed} = req.body;
            const ownerId = req.params.ownerId;
            const petId = req.params.id;

            //TODO: remove age number assertion/parsing
            const petRegisterDto = new PetRegisterDto(
                name,
                +age,
                sex,
                species,
                breed,
                ownerId,
            );

            const validationErrors = await validate(petRegisterDto);
            if (validationErrors.length > 0) {
                return res.status(400).json(validationErrors.map(v => v.constraints));
            }

            const reqPhotoFile = req.file;
            console.log(reqPhotoFile);

            const pet = await this.petEditUseCase.execute(petId, petRegisterDto, reqPhotoFile);
            const petDto = this.petMapper.toDto(pet);

            return res.status(200).json(petDto);
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