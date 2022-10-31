import { IDiaryRepository } from "../../diary.repository";
import { IOwnerRepository } from "../../../owner/owner.repository";
import { DiaryModel } from "../../diary.model";

export class DiaryShowUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
        private diaryRepository: IDiaryRepository,
    ) {
    }

    async execute(ownerId: string, diaryId: string) {
        if (!await this.ownerRepository.existsById(ownerId)) {
            throw new Error("Nonexistent owner of id " + ownerId);
        }

        const diary: DiaryModel | null = await this.diaryRepository.findById(diaryId);

        if (!diary) {
            throw new Error("Diary not found.");
        }

        return diary;
    }
}