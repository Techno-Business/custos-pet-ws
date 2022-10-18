import { Request, Response } from 'express';
import { OwnerDto } from "./owner.dto";
import { OwnerSignUpUseCase } from "./useCases/SignUp/OwnerSignUpUseCase";
import { OwnerSignUpDto } from "./useCases/SignUp/OwnerSignUpDto";
import { validate } from "class-validator";
import { OwnerMapper } from "./owner.mapper";
import { OwnerSignInDto } from "./useCases/SignIn/OwnerSignInDto";
import { OwnerSignInUseCase } from "./useCases/SignIn/OwnerSignInUseCase";

export class OwnerController {
    constructor(
        private ownerSignUpUseCase: OwnerSignUpUseCase,
        private ownerSignInUseCase: OwnerSignInUseCase,
        private ownerMapper: OwnerMapper,
    ) {
    }

    async signUp(req: Request, res: Response): Promise<Response<OwnerDto>> {
        try {
            const { firstName, lastName, email, password, passwordConfirmation } = req.body;

            const ownerSignUpDto = new OwnerSignUpDto(
                firstName,
                lastName,
                email,
                password,
                passwordConfirmation,
            )

            const validationErrors = await validate(ownerSignUpDto);
            if (validationErrors.length > 0) {
                return res.status(400).json(validationErrors.map(v => v.constraints));
            }

            const owner = await this.ownerSignUpUseCase.execute(ownerSignUpDto);
            const ownerDto = this.ownerMapper.toDto(owner);

            return res.status(201).json(ownerDto);
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

    async signIn(req: Request, res: Response): Promise<Response<OwnerDto>> {
        try {
            const { email, password } = req.body;

            const ownerSignInDto = new OwnerSignInDto(
                email,
                password
            );

            const validationErrors = await validate(ownerSignInDto);
            if (validationErrors.length > 0) {
                return res.status(400).json(validationErrors.map(v => v.constraints));
            }

            const owner = await this.ownerSignInUseCase.execute(ownerSignInDto);
            const ownerDto = this.ownerMapper.toDto(owner);

            return res.status(201).json(ownerDto);

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