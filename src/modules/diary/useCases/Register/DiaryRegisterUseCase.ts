import { DiaryRegisterDto } from "./DiaryRegisterDto";
import { DiaryModel } from "../../diary.model";
import { IPetDiaryRepository } from "../../pet.diary.repository";
import { IOwnerRepository } from "../../../owner/owner.repository";
import { IPetRepository } from "../../../pet/pet.repository";

export class DiaryRegisterUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
        private petRepository: IPetRepository,
        private petDiaryRepository: IPetDiaryRepository,
    ) {
    }

    async execute(ownerId: string, data: DiaryRegisterDto): Promise<DiaryModel> {
        if (!await this.ownerRepository.existsById(ownerId)) {
            throw new Error("Nonexistent owner of id " + ownerId);
        }

        const petsId = data.petId;
        for (let petId of petsId) {
            const exists = await this.petRepository.existsById(petId);
            if (!exists) {
                throw new Error('Nonexistent pet of id ' + petId);
            }
        }

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