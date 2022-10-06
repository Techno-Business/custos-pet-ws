import { FeedCostRegisterDto, ServiceCostRegisterDto, VaccineCostRegisterDto } from "./CostRegisterDto";
import { CostModel } from "../../cost.model";
import { IPetRepository } from "../../../pet/pet.repository";
import { ICostRepository } from "../../cost.repository";
import { IPetCostRepository } from "../../pet.cost.repository";

export class CostRegisterUseCase {
    constructor(
        private petRepository: IPetRepository,
        private costRepository: ICostRepository,
        private petCostRepository: IPetCostRepository,
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

        //1. criar details
        //2. criar costs associando details
        //3. criar associações de costs e pets

        //TODO: refactor cost save and put it inside the transaction
        const savedCost = await this.costRepository.save(cost);
        try {
            await this.petCostRepository.save(cost.id, cost.petId);
        } catch (e) {
            //...
        }

        return savedCost;
    }
}