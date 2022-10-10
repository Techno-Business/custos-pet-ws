import { IPetCostRepository } from "../../../modules/cost/pet.cost.repository";
import { PetRepository } from "./PetRepository";
import PetCost from "../models/PetCost";
import { CostModel } from "../../../modules/cost/cost.model";
import { CostRepository } from "./CostRepository";

export class PetCostRepository implements IPetCostRepository {
    constructor(
        private petCostSequelizeModel: typeof PetCost,
        private petRepository: PetRepository,
        private costRepository: CostRepository,
    ) {
    }

    async save(cost: CostModel): Promise<CostModel> {
        try {
            const result = <CostModel> await this.petCostSequelizeModel.sequelize?.transaction(async (t) => {
                let savedCost = await this.costRepository.save(cost);

                for (let id of cost.petId) {
                    await this.petCostSequelizeModel.create({
                        pet_id: id,
                        cost_id: cost.id,
                    }, { transaction: t });
                }

                savedCost.petId = cost.petId;

                return savedCost;
            });

            return result;
        } catch (e) {
            throw (e);
        }
    }
}