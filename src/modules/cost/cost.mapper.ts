import { CostModel } from "./cost.model";
import { FeedCostDto, ServiceCostDto, VaccineCostDto } from "./cost.dto";
import {CostType} from "./useCases/Register/CostRegisterDto";

export class CostMapper {
    public toEntity (cost: CostModel): any {
        return {
            id: cost?.id?.toString(),
            type: cost.type.toString(),
            date: cost.date,
            price: cost.price,
            description: cost.description,
            brand: cost?.brand,
            weight: cost?.weight,
            service_type: cost?.serviceType,
            pet_id: cost.petId,
        }
    }

    public toModel (raw: any): CostModel {
        return new CostModel(
            raw.pet_id,
            raw.type,
            raw.date,
            raw.price,
            raw['details.description'],
            raw['details.brand'],
            raw['details.weight'],
            raw['details.service_type'],
            raw.id,
        )
    }

    toDto(cost: CostModel): FeedCostDto | VaccineCostDto | ServiceCostDto {
        if (cost.type == CostType.Service) {
            return <ServiceCostDto> {
                id: cost.id,
                petId: cost.petId,
                type: cost.type,
                date: cost.date,
                price: cost.price,
                goal: cost.description,
                serviceType: cost.serviceType,
            }
        } else if (cost.type == CostType.Vaccine) {
            return <VaccineCostDto> {
                id: cost.id,
                petId: cost.petId,
                type: cost.type,
                date: cost.date,
                price: cost.price,
                goal: cost.description,
            }
        } else {
            return <FeedCostDto> {
                id: cost.id,
                petId: cost.petId,
                type: cost.type,
                date: cost.date,
                price: cost.price,
                goal: cost.description,
                brand: cost?.brand,
                weight: cost?.weight,
            }
        }
    }
}