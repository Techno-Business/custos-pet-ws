import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

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
    password: string;
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(64)
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