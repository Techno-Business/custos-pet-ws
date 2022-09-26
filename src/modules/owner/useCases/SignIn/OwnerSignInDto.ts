import {IsEmail, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export interface OwnerSignInDto {
    email: string;
    password: string;
}

export class OwnerSignInDto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(64)
    password: string;

    constructor(
        email: string,
        password: string,
    ) {
        this.email = email;
        this.password = password;
    }
}