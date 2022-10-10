import { IOwnerRepository } from "../../../owner/owner.repository";
import { CostModel } from "../../cost.model";
import { IPetCostRepository } from "../../pet.cost.repository";

export class CostListUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
        private petCostRepository: IPetCostRepository,
    ) {
    }

    async execute(ownerId: string) {
        if (!await this.ownerRepository.existsById(ownerId)) {
            throw new Error("Nonexistent owner of id " + ownerId);
        }

        const costs: CostModel[] | null = await this.petCostRepository.findAllByOwnerId(ownerId);

        return costs;
    }
}