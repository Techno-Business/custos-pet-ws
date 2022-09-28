import { IPetRepository } from "../../pet.repository";

export class PetRemoveUseCase {
    constructor(
        private petRepository: IPetRepository,
    ) {
    }

    async execute(petId: string) {

    }
}