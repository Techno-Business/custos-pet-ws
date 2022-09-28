import { IPetRepository } from "../../pet.repository";
import { PetModel } from "../../pet.model";

export class PetListUseCase {
    constructor(
        private petRepository: IPetRepository,
    ) {
    }

    async execute(ownerId: string): Promise<PetModel[]> {
        const pets: PetModel[] | null = await this.petRepository.findAllByOwnerId(ownerId);

        if (!pets) {
            throw new Error('Nenhum pet cadastrado no momento.');
        }

        return pets;
    }
}