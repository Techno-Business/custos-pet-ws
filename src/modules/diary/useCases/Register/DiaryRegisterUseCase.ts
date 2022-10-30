import { DiaryRegisterDto } from "./DiaryRegisterDto";
import { DiaryModel } from "../../diary.model";
import { IPetDiaryRepository } from "../../pet.diary.repository";

export class DiaryRegisterUseCase {
    constructor(
        private petDiaryRepository: IPetDiaryRepository,
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

        return await this.petDiaryRepository.save(diary);
    }
}