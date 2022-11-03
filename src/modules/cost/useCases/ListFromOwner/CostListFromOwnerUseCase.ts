import { IOwnerRepository } from "../../../owner/owner.repository";
import { IPetCostRepository } from "../../pet.cost.repository";

export class CostListFromOwnerUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
        private petCostRepository: IPetCostRepository,
    ) {
    }

    async execute(ownerId: string): Promise<string[]> {
        if (!await this.ownerRepository.existsById(ownerId)) {
            throw new Error("Nonexistent owner of id " + ownerId);
        }

        const costs = await this.petCostRepository.findAllByOwnerId(ownerId);

        if (!costs) {
            throw new Error("No costs registered yet.");
        }

        return costs;
    }
}