import { IPetDiaryRepository } from "../../pet.diary.repository";
import { IOwnerRepository } from "../../../owner/owner.repository";

export class DiaryListFromOwnerUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
        private petDiaryRepository: IPetDiaryRepository,
    ) {
    }

    async execute(ownerId: string) {
        if (!await this.ownerRepository.existsById(ownerId)) {
            throw new Error("Nonexistent owner of id " + ownerId);
        }

        const diaries = await this.petDiaryRepository.findAllByOwnerId(ownerId);

        if (!diaries) {
            throw new Error('No events registered yet in pet diary');
        }

        return diaries;
    }
}