import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PetCategories } from "../../pet.categories.enum";

export interface PetRegisterDto {
    name: string;
    age: number;
    sex: string;
    species: PetCategories;
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
    @IsEnum(PetCategories)
    species: PetCategories;
    @IsNotEmpty()
    @IsString()
    ownerId: string;

    constructor(
        name: string,
        age: number,
        sex: string,
        species: PetCategories,
        ownerId: string,
    ) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.species = species;
        this.ownerId = ownerId;
    }
}
