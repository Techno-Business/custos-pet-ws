import { Request, Response } from 'express';
import { OwnerDto } from "./owner.dto";
import { OwnerSignUpUseCase } from "./useCases/SignUp/OwnerSignUpUseCase";
import { OwnerSignUpDto } from "./useCases/SignUp/OwnerSignUpDto";
import {validate} from "class-validator";

export class OwnerController {
    constructor(
        private ownerSignUpUserCase: OwnerSignUpUseCase,
    ) {
    }

    async signUp(req: Request, res: Response): Promise<Response<OwnerDto>> {
        try {
            const ownerSignUpDto = new OwnerSignUpDto(
                "Shinei",
                "Nouzen",
                "nouzen86@email.com",
                "rlystr0ngpzzword",
            )
            const validationErrors = await validate(ownerSignUpDto);
            if (validationErrors.length > 0) {
                return res.status(400).json(validationErrors.map(v => v.constraints));
            }

            const owner = await this.ownerSignUpUserCase.execute(ownerSignUpDto);

            return res.status(201).json(owner);
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