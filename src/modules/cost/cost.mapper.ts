import { CostModel } from "./cost.model";

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
}