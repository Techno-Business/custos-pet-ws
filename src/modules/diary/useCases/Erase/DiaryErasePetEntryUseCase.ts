import { IOwnerRepository } from "../../../owner/owner.repository";
import { IPetDiaryRepository } from "../../pet.diary.repository";

export class DiaryErasePetEntryUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
        private petDiaryRepository: IPetDiaryRepository,
    ) {
    }

    async execute(ownerId: string, diaryId: string, petId: string): Promise<void> {
        if (!await this.ownerRepository.existsById(ownerId)) {
            throw new Error("Nonexistent owner of id " + ownerId);
        }

        await this.petDiaryRepository.deletePetDiary(petId, diaryId);
    }
}