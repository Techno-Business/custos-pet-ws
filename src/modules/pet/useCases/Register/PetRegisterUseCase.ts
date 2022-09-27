import { PetRegisterDto } from "./PetRegisterDto";
import { PetModel } from "../../pet.model";
import { IPetRepository } from "../../pet.repository";

export class PetRegisterUseCase {
    constructor(
        private petRepository: IPetRepository,
    ) {
    }

    async execute(data: PetRegisterDto): Promise<PetModel> {
        const pet = new PetModel(
            data.name,
            "photo-title-or-smt",
            data.age,
            data.sex,
            data.species,
            data.breed,
            data.ownerId,
        );

        return await this.petRepository.save(pet);
    }
}