import { DiaryModel } from "../../diary.model";
import { IPetDiaryRepository } from "../../pet.diary.repository";

export class DiaryListUseCase {
    constructor(
        private petDiaryRepository: IPetDiaryRepository,
    ) {
    }

    async execute(ownerId: string, petId: string) {
        const diaries: DiaryModel[] | null = await this.petDiaryRepository.findAllByPetId(petId);

        if (!diaries) {
            throw new Error('No events registered yet in pet diary');
        }

        return diaries;
    }
}