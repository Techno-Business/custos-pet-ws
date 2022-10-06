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
                const savedCost = await this.costRepository.save(cost);

                for (let id of cost.petId) {
                    const exists = await this.petRepository.existsById(id);
                    if (!exists) {
                        throw new Error('Nonexistent pet of id ' + id);
                    }

                    await this.petCostSequelizeModel.create({
                        pet_id: id,
                        cost_id: cost.id,
                    }, { transaction: t });
                }

                return savedCost;
            });

            return result;
        } catch (e) {
            throw (e);
        }
    }
}