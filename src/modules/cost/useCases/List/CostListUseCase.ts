import { IOwnerRepository } from "../../../owner/owner.repository";
import { CostModel } from "../../cost.model";
import { IPetCostRepository } from "../../pet.cost.repository";
import {IPetRepository} from "../../../pet/pet.repository";

export class CostListUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
        private petRepository: IPetRepository,
        private petCostRepository: IPetCostRepository,
    ) {
    }

    async execute(ownerId: string, petId: string) {
        if (!await this.ownerRepository.existsById(ownerId)) {
            throw new Error("Nonexistent owner of id " + ownerId);
        }

        if (!await this.petRepository.existsById(petId)) {
            throw new Error("Nonexistent pet of id " + petId);
        }

        const costs: CostModel[] | null = await this.petCostRepository.findAllByPetId(petId);

        return costs;
    }
}