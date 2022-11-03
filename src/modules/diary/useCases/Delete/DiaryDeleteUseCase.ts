import { IOwnerRepository } from "../../../owner/owner.repository";
import { IPetDiaryRepository } from "../../pet.diary.repository";
import { IDiaryRepository } from "../../diary.repository";

export class DiaryDeleteUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
        private diaryRepository: IDiaryRepository,
        private petDiaryRepository: IPetDiaryRepository,
    ) {
    }

    async execute(ownerId: string, diaryId: string): Promise<void> {
        if (!await this.ownerRepository.existsById(ownerId)) {
            throw new Error("Nonexistent owner of id " + ownerId);
        }

        const diary = await this.diaryRepository.findById(diaryId);
        if (!diary) {
            throw new Error("Nonexistent diary of id " + diaryId);
        }

        await this.petDiaryRepository.deleteDiary(diary);
    }
}