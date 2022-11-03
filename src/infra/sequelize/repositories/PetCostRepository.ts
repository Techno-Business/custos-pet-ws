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

    async findAllByPetId(petId: string): Promise<CostModel[] | null> {
        try {
            const  result = <CostModel[]> await this.petCostSequelizeModel.sequelize?.transaction(async (t) => {
                const costsIds = await this.petCostSequelizeModel.findAll({
                    attributes: ['cost_id'],
                    where: {
                        pet_id: petId,
                    },
                    group: ['cost_id'],
                    raw: true,
                    transaction: t,
                });

                const areCostsIdsEmpty = Object.keys(costsIds).length === 0
                if (areCostsIdsEmpty) {
                    return ;
                }

                const costsIdsList = costsIds.map((c) => {
                    return Object.values(c)[0];
                });
                const costs = await this.costRepository.findAllByIds(costsIdsList);

                return costs;
            });

            return result;
        } catch (e) {
            throw (e);
        }
    }

    async findAllByOwnerId(ownerId: string): Promise<string[]> {
        try {
            const  result = <[]> await this.petCostSequelizeModel.sequelize?.transaction(async (t) => {
                // @ts-ignore
                const [results, metadata] = await this.petCostSequelizeModel.sequelize?.query(
                    "SELECT pets.id AS pet_id, pets.name AS pet_name, SUM(costs.price) AS total_price FROM costs JOIN pets_costs ON pets_costs.cost_id = costs.id JOIN pets ON pets_costs.pet_id = pets.id WHERE pets.owner_id  = :ownerId GROUP BY pets.id",
                    {
                        replacements: {
                            ownerId
                        },
                        raw: true,
                        transaction: t,
                    }
                );

                return results;
            });

            return result;
        } catch (e) {
            throw (e);
        }
    }

}