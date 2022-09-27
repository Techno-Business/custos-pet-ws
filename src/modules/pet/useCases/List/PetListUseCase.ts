import { IPetRepository } from "../../pet.repository";
import { PetModel } from "../../pet.model";

export class PetListUseCase {
    constructor(
        private petRepository: IPetRepository,
    ) {
    }

    async execute(ownerId: string): Promise<PetModel[]> {
        const pets: PetModel[] = await this.petRepository.findAllByOwnerId(ownerId);

        return pets;
    }
}