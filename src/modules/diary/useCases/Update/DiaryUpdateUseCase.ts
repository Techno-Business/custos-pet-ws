import { DiaryRegisterDto } from "../Register/DiaryRegisterDto";
import { IOwnerRepository } from "../../../owner/owner.repository";
import { IDiaryRepository } from "../../diary.repository";
import {DiaryModel} from "../../diary.model";

export class DiaryUpdateUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
        private diaryRepository: IDiaryRepository,
    ) {
    }

    async execute(ownerId: string, diaryId: string, data: DiaryRegisterDto) {
        if (!await this.ownerRepository.existsById(ownerId)) {
            throw new Error("Nonexistent owner of id " + ownerId);
        }

        const diary: DiaryModel | null = await this.diaryRepository.findById(diaryId);
        if (!diary) {
            throw new Error("Nonexistent diary of id " + diaryId);
        }

        return "hello there, " + ownerId + ", " + diaryId;
    }
}