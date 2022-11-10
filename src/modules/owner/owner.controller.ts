import { Request, Response } from 'express';
import { OwnerDto } from "./owner.dto";
import { OwnerSignUpUseCase } from "./useCases/SignUp/OwnerSignUpUseCase";
import { OwnerSignUpDto } from "./useCases/SignUp/OwnerSignUpDto";
import { validate } from "class-validator";
import { OwnerMapper } from "./owner.mapper";
import { OwnerSignInDto } from "./useCases/SignIn/OwnerSignInDto";
import { OwnerSignInUseCase } from "./useCases/SignIn/OwnerSignInUseCase";
import { sendMail } from '../../infra/email';
import { RecoveryPasswordCaseUse } from './useCases/RecoverPassword/RecoveryPasswordCaseUse';

export class OwnerController {
    constructor(
        private ownerSignUpUseCase: OwnerSignUpUseCase,
        private ownerSignInUseCase: OwnerSignInUseCase,
        private recoveryPasswordCaseUse: RecoveryPasswordCaseUse,
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

    async recover(req: Request, res: Response){
        const fromEmail = process.env.FROM_EMAIL;
        const emailTo = req.body.email
        
            const code = await this.recoveryPasswordCaseUse.execute(emailTo);
            if (code === 'owner not found'){
                return res.status(400).json('owner email not found');
            }
        
            const {response, body} = await sendMail({
                fromEmail: fromEmail!,
                fromName: 'Equipe Techbusiness',
                subject: '[Equipe Techbusiness] - Recuperação de Senha',
                html: `<h1> Recuperação de email </h1> <p> Digite o seguinte código para recuperar seu email  </p> <p> <b> ${code} </b> </p>`,
                recepients: [{Email: emailTo}]}
            );
            
            if (response.status != 200){
                return res.status(400).json({'type': 'error on email sending',
                                              'statusEmail': response.status,
                                              'errorEmail': body
                                            });
            }
            
            

            return res.status(200).json( 'Email sent successfully!' );
        
        
    }

}