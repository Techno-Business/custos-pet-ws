import { FeedCostRegisterDto, ServiceCostRegisterDto, VaccineCostRegisterDto } from "./CostRegisterDto";
import { CostModel } from "../../cost.model";
import { IPetRepository } from "../../../pet/pet.repository";

export class CostRegisterUseCase {
    constructor(
        private petRepository: IPetRepository,
    ) {
    }

    async execute(data: ServiceCostRegisterDto | VaccineCostRegisterDto | FeedCostRegisterDto): Promise<CostModel> {
        let cost;

        if (data instanceof ServiceCostRegisterDto) {
            cost = new CostModel(
                data.baseCost.petId,
                data.baseCost.type,
                data.baseCost.date,
                data.baseCost.price,
                data.description,
            )
        } else if (data instanceof VaccineCostRegisterDto) {
            cost = new CostModel(
                data.baseCost.petId,
                data.baseCost.type,
                data.baseCost.date,
                data.baseCost.price,
                data.description,
            )
        } else {
            cost = new CostModel(
                data.baseCost.petId,
                data.baseCost.type,
                data.baseCost.date,
                data.baseCost.price,
                data.description,
                data.brand,
                data.weight,
            )
        }

        for (const petId of cost.petId) {
            await this.petRepository.createCostById(petId, cost);
        }

        return cost;
    }
}