import { Request, Response } from 'express';
import { PetRegisterDto } from "./useCases/Register/PetRegisterDto";
import { validate } from "class-validator";
import { PetRegisterUseCase } from "./useCases/Register/PetRegisterUseCase";
import { PetMapper } from "./pet.mapper";

export class PetController {
    constructor(
        private petRegisterUseCase: PetRegisterUseCase,
        private petMapper: PetMapper,
    ) {
    }

    async register(req: Request, res: Response) {
        try {
            const { name, age, sex, species, breed } = req.body;
            const ownerId = req.params.ownerId;

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
}