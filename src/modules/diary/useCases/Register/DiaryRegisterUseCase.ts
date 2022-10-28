import { DiaryRegisterDto } from "./DiaryRegisterDto";
import { DiaryModel } from "../../diary.model";

export class DiaryRegisterUseCase {
    constructor() {
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

        return diary;
    }
}