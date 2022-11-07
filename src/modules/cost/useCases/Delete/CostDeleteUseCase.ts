import { IOwnerRepository } from "../../../owner/owner.repository";
import { ICostRepository } from "../../cost.repository";
import { IPetCostRepository } from "../../pet.cost.repository";

export class CostDeleteUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
        private costRepository: ICostRepository,
        private petCostRepository: IPetCostRepository,
    ) {
    }

    async execute(ownerId: string, costId: string): Promise<void> {
        if (!await this.ownerRepository.existsById(ownerId)) {
            throw new Error("Nonexistent owner of id " + ownerId);
        }

        const cost = await this.costRepository.findById(costId);

        if (!cost) {
            throw new Error("Nonexistent cost of id " + costId);
        }

        await this.petCostRepository.delete(cost);
    }
}