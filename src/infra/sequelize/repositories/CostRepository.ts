import { ICostRepository } from "../../../modules/cost/cost.repository";
import { CostModel } from "../../../modules/cost/cost.model";
import { CostMapper } from "../../../modules/cost/cost.mapper";
import Cost from '../models/Cost';
import Details from '../models/Details';

export class CostRepository implements ICostRepository {
    constructor(
        private costSequelizeModel: typeof Cost,
        private costMapper: CostMapper,
    ) {
    }

    async save(cost: CostModel, petId: string): Promise<CostModel> {
        const savedCost = await this.costSequelizeModel.create({
            id: cost.id,
            type: cost.type,
            date: cost.date,
            price: cost.price,
            details: [{
                id: cost.id,
                service_type: cost.serviceType,
                brand: cost.brand,
                weight: cost.weight,
                description: cost.description,
            }]
        }, {
            through: 'pets_costs',
            include: {
                model: Details,
                as: 'details',
            },
        });

        return this.costMapper.toModel(savedCost);
    }
}