import { CostModel } from "./cost.model";

export interface IPetCostRepository {
    save(cost: CostModel): Promise<CostModel>
    findAllByPetId(petId: string): Promise<CostModel[] | null>;
    findAllByOwnerId(ownerId: string): Promise<string[]>;
}