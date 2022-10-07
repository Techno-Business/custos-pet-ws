import { CostType } from "./useCases/Register/CostRegisterDto";

export interface BaseCostDto {
    id: string;
    petId: string[];
    type: CostType;
    date: string;
    price: number;
    goal: string;
}

export interface FeedCostDto extends BaseCostDto {
    brand: string;
    weight: number;
}

export interface VaccineCostDto extends BaseCostDto {  }

export interface ServiceCostDto extends BaseCostDto {
    serviceType: string;
}
