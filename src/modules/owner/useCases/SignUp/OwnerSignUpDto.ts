import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export interface OwnerSignUpDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
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

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}