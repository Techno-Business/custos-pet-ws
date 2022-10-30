import { DiaryRegisterDto } from "./DiaryRegisterDto";
import { DiaryModel } from "../../diary.model";
import { IDiaryRepository } from "../../diary.repository";

export class DiaryRegisterUseCase {
    constructor(
        private diaryRepository: IDiaryRepository,
    ) {
    }

    async execute(ownerId: string, data: DiaryRegisterDto): Promise<DiaryModel> {
        const diary = new DiaryModel(
            data.petId,
            data.title,
            data.date,
            data.street,
            data.number,
            data.postalCode,
            data.neighbourhood,
        )

        return await this.diaryRepository.save(diary);
    }
}