import { Request, Response } from 'express';
import { PetRegisterDto } from "./useCases/Register/PetRegisterDto";
import {validate} from "class-validator";

export class PetController {
    async register(req: Request, res: Response) {
        try {
            console.log(req.body);
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

            //const pet = await this.petRegisterUseCase.execute(petRegisterDto,)

            return res.status(201).json(petRegisterDto);
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