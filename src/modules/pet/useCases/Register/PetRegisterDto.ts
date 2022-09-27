import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export interface PetRegisterDto {
    name: string;
    age: number;
    sex: string;
    species: string;
    breed: string;
    ownerId: string;
}

export class PetRegisterDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsNumber()
    age: number;
    @IsNotEmpty()
    @IsString()
    sex: string;
    @IsNotEmpty()
    @IsString()
    species: string;
    @IsNotEmpty()
    @IsString()
    breed: string;
    @IsNotEmpty()
    @IsString()
    ownerId: string;

    constructor(
        name: string,
        age: number,
        sex: string,
        species: string,
        breed: string,
        ownerId: string,
    ) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.species = species;
        this.breed = breed;
        this.ownerId = ownerId;
    }
}
