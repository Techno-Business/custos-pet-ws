import { IsArray, IsISO8601, IsNotEmpty, IsString, Length } from "class-validator";

export class DiaryRegisterDto {
    @IsNotEmpty()
    @IsArray()
    petId: string[];
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsISO8601()
    date: string;
    @IsString()
    street: string;
    @IsString()
    number: string;
    @IsString()
    @Length(8, 8)
    postalCode: string;
    @IsString()
    neighbourhood: string;

    constructor(
        petId: string[],
        title: string,
        date: string,
        street: string,
        number: string,
        postalCode: string,
        neighbourhood: string
    ) {
        this.petId = petId;
        this.title = title;
        this.date = date;
        this.street = street;
        this.number = number;
        this.postalCode = postalCode;
        this.neighbourhood = neighbourhood;
    }
}