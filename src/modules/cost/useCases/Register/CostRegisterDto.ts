import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export enum CostType {
    Service = "Service",
    Vaccine = "Vaccine",
    Feed = "Feed",
}

export class BaseCostRegisterDto {
    @IsNotEmpty()
    //@IsUUID(4, { each: true })
    petId: string;
    @IsNotEmpty()
    @IsEnum(CostType)
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

export class ServiceCostRegisterDto {
    baseCost: BaseCostRegisterDto;
    serviceType: string;
    @IsNotEmpty()
    @IsString()
    description: string;

    constructor(
        baseCost: BaseCostRegisterDto,
        serviceType: string,
        description: string
    ) {
        this.baseCost = baseCost;
        this.serviceType = serviceType;
        this.description = description;
    }
}

export class VaccineCostRegisterDto {
    baseCost: BaseCostRegisterDto;
    @IsNotEmpty()
    @IsString()
    description: string;

    constructor(
        baseCost: BaseCostRegisterDto,
        description: string
    ) {
        this.baseCost = baseCost;
        this.description = description;
    }
}

export class FeedCostRegisterDto {
    baseCost: BaseCostRegisterDto;
    @IsNotEmpty()
    @IsString()
    brand: string;
    @IsNotEmpty()
    @IsNumber()
    weight: string;
    @IsNotEmpty()
    @IsString()
    description: string;

    constructor(
        baseCost: BaseCostRegisterDto,
        brand: string,
        weight: string,
        description: string
    ) {
        this.baseCost = baseCost;
        this.brand = brand;
        this.weight = weight;
        this.description = description;
    }
}