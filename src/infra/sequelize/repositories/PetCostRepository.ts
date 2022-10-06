import { IPetCostRepository } from "../../../modules/cost/pet.cost.repository";
import { PetRepository } from "./PetRepository";
import PetCost from "../models/PetCost";

export class PetCostRepository implements IPetCostRepository {
    constructor(
        private petCostSequelizeModel: typeof PetCost,
        private petRepository: PetRepository,
    ) {
    }

    async save(costId: string, petId: string[]): Promise<void> {
        try {
            const result = await this.petCostSequelizeModel.sequelize?.transaction(async (t) => {
                for (let id of petId) {
                    const exists = await this.petRepository.existsById(id);
                    if (!exists) {
                        throw new Error('Nonexistent pet of id ' + id);
                    }

                    await this.petCostSequelizeModel.create({
                        pet_id: id,
                        cost_id: costId,
                    }, { transaction: t });
                }
            });
        } catch (e) {
            console.log(e);
        }

        return Promise.resolve(undefined);
    }
}