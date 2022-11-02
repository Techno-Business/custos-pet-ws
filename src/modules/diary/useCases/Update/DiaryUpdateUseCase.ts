import { DiaryRegisterDto } from "../Register/DiaryRegisterDto";
import { IOwnerRepository } from "../../../owner/owner.repository";
import { IDiaryRepository } from "../../diary.repository";
import { DiaryModel } from "../../diary.model";
import { IPetDiaryRepository } from "../../pet.diary.repository";

export class DiaryUpdateUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
        private diaryRepository: IDiaryRepository,
        private petDiaryRepository: IPetDiaryRepository,
    ) {
    }

    async execute(ownerId: string, diaryId: string, data: DiaryRegisterDto): Promise<void> {
        if (!await this.ownerRepository.existsById(ownerId)) {
            throw new Error("Nonexistent owner of id " + ownerId);
        }

        const diary: DiaryModel | null = await this.diaryRepository.findById(diaryId);
        if (!diary) {
            throw new Error("Nonexistent diary of id " + diaryId);
        }

        const newDiary = new DiaryModel(
            data.petId,
            data.title,
            data.date,
            data.street,
            data.number,
            data.postalCode,
            data.neighbourhood,
            diaryId,
        );

        await this.petDiaryRepository.update(diary, newDiary);
    }
}