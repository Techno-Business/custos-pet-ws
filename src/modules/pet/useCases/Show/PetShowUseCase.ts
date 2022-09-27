import {PetModel} from "../../pet.model";
import {IPetRepository} from "../../pet.repository";

export class PetShowUseCase {
    constructor(
        private petRepository: IPetRepository,
    ) {
    }

    async execute(petId: string): Promise<PetModel> {
        const pet: PetModel = await this.petRepository.findById(petId);

        return pet;
    }
}