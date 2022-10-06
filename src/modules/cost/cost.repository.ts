import { CostModel } from "./cost.model";

export interface ICostRepository {
    save(cost: CostModel, petId: string): Promise<CostModel>
}