import { ICostRepository } from "../../../modules/cost/cost.repository";
import { CostModel } from "../../../modules/cost/cost.model";
import { CostMapper } from "../../../modules/cost/cost.mapper";
import Cost from '../models/Cost';
import Details from '../models/Details';
import { Model } from "sequelize";

export class CostRepository implements ICostRepository {
    constructor(
        private costSequelizeModel: typeof Cost,
        private costMapper: CostMapper,
    ) {
    }

    async save(cost: CostModel): Promise<CostModel> {
        const rawCost = this.costMapper.toEntity(cost);

        const savedCost = await this.costSequelizeModel.create({
            id: rawCost.id,
            type: rawCost.type,
            date: rawCost.date,
            price: rawCost.price,
            details: [{
                id: rawCost.id,
                service_type: rawCost.service_type,
                brand: rawCost.brand,
                weight: rawCost.weight,
                description: rawCost.description,
            }]
        }, {
            include: {
                model: Details,
                as: 'details',
            },
        });

        const savedCostLoaded = await this.findById(savedCost.getDataValue('id'));

        return <CostModel>savedCostLoaded;
    }

    async findById(costId: string): Promise<CostModel | null> {
        const pk = costId;

        const cost = await this.costSequelizeModel.findByPk(pk, {
            include: {
                model: Details,
                as: 'details',
            },
            raw: true,
        });

        let hasCost: CostModel | null;
        cost ? hasCost = this.costMapper.toModel(cost) : hasCost = null;

        return hasCost;
    }

    async findAllByIds(costsId: string[]): Promise<CostModel[] | null> {
        const costs = await this.costSequelizeModel.findAll({
            where: {
              id: costsId,
            },
            include: {
                model: Details,
                as: 'details',
            },
            raw: true,
        });

        let hasCosts: CostModel[] | null;
        costs ? hasCosts = costs.map((cost: Model<CostModel>) => this.costMapper.toModel(cost)) : hasCosts = null;

        return hasCosts;
    }
}