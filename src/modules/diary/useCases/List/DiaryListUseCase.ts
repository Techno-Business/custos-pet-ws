import { DiaryModel } from "../../diary.model";
import { IPetDiaryRepository } from "../../pet.diary.repository";
import { IOwnerRepository } from "../../../owner/owner.repository";
import { IPetRepository } from "../../../pet/pet.repository";

export class DiaryListUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
        private petRepository: IPetRepository,
        private petDiaryRepository: IPetDiaryRepository,
    ) {
    }

    async execute(ownerId: string, petId: string) {
        if (!await this.ownerRepository.existsById(ownerId)) {
            throw new Error("Nonexistent owner of id " + ownerId);
        }

        if (!await this.petRepository.existsById(petId)) {
            throw new Error('Nonexistent pet of id ' + petId);
        }

        const diaries: DiaryModel[] | null = await this.petDiaryRepository.findAllByPetId(petId);

        if (!diaries) {
            throw new Error('No events registered yet in pet diary');
        }

        return diaries;
    }
}