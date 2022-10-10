import { FeedCostRegisterDto, ServiceCostRegisterDto, VaccineCostRegisterDto } from "./CostRegisterDto";
import { CostModel } from "../../cost.model";
import { IOwnerRepository } from "../../../owner/owner.repository";
import { IPetRepository } from "../../../pet/pet.repository";
import { ICostRepository } from "../../cost.repository";
import { IPetCostRepository } from "../../pet.cost.repository";

export class CostRegisterUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
        private petRepository: IPetRepository,
        private costRepository: ICostRepository,
        private petCostRepository: IPetCostRepository,
    ) {
    }

    async execute(ownerId: string, data: ServiceCostRegisterDto | VaccineCostRegisterDto | FeedCostRegisterDto): Promise<CostModel> {
        if (!await this.ownerRepository.existsById(ownerId)) {
            throw new Error("Nonexistent owner of id " + ownerId);
        }

        const petsId = data.baseCost.petId;
        for (let petId of petsId) {
            const exists = await this.petRepository.existsById(petId);
            if (!exists) {
                throw new Error('Nonexistent pet of id ' + petId);
            }
        }

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

        return await this.petCostRepository.save(cost);
    }
}