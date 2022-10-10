import { CostModel } from "./cost.model";

export interface IPetCostRepository {
    save(cost: CostModel): Promise<CostModel>
    findAllByOwnerId(ownerId: string): Promise<CostModel[] | null>;
}