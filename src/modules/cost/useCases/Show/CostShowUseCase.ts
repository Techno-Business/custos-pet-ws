import { CostModel } from "../../cost.model";
import { IOwnerRepository } from "../../../owner/owner.repository";
import { ICostRepository } from "../../cost.repository";

export class CostShowUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
        private costRepository: ICostRepository,
    ) {
    }

    async execute(ownerId: string, costId: string) {
        if (!await this.ownerRepository.existsById(ownerId)) {
            throw new Error("Nonexistent owner of id " + ownerId);
        }

        const cost: CostModel | null = await this.costRepository.findById(costId);

        if (!cost) {
            throw new Error("Cost not found.");
        }

        return cost;
    }
}