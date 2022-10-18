import {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";

export interface OwnerSignUpDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export class OwnerSignUpDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;
    @IsNotEmpty()
    @IsString()
    lastName: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(64)
    @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/, {
        message: 'Password must contain at least a number, a lowercase letter, a uppercase letter and a special character'
    })
    password: string;
    @IsNotEmpty()
    passwordConfirmation: string;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        passwordConfirmation: string,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;
    }
}