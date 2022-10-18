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

        //TODO: refactor to include an actual error response w/ adequate status code and etc instead of empty response

        // if (!costs) {
        //     throw new Error("This pet has no expenses yet");
        // }

        return costs;
    }
}