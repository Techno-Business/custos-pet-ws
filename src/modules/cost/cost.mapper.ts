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

    public toModel (raw: any): CostModel {
        return new CostModel(
            raw.pet_id,
            raw.type,
            raw.date,
            raw.price,
            raw.description,
            raw?.brand,
            raw?.weight,
            raw?.service_type,
            raw.id,
        )
    }
}