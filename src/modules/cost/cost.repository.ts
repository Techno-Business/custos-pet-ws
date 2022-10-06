import { CostModel } from "./cost.model";

export interface ICostRepository {
    save(cost: CostModel): Promise<CostModel>;
    findById(costId: string): Promise<CostModel | null>;
}