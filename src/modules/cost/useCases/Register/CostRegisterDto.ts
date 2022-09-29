import {IsInt, IsNotEmpty, IsString, IsUUID} from "class-validator";

export class BaseCostRegisterDto {
    @IsNotEmpty()
    //@IsUUID(4, { each: true })
    petId: string;
    @IsNotEmpty()
    @IsString()
    type: string;
    @IsNotEmpty()
    @IsString()
    date: string;
    @IsNotEmpty()
    @IsInt()
    price: number;

    constructor(
        petId: string,
        type: string,
        date: string,
        price: number
    ) {
        this.petId = petId;
        this.type = type;
        this.date = date;
        this.price = price;
    }
}