import { IPetDiaryRepository } from "../../../modules/diary/pet.diary.repository";
import { DiaryModel } from "../../../modules/diary/diary.model";
import PetDiary from '../models/PetDiary'
import { IDiaryRepository } from "../../../modules/diary/diary.repository";
import { IAddressRepository } from "../../../modules/diary/address.repository";

export class PetDiaryRepository implements IPetDiaryRepository {
    constructor(
        private petDiarySequelizeModel: typeof PetDiary,
        private diaryRepository: IDiaryRepository,
        private addressRepository: IAddressRepository,
    ) {
    }

    async save(diary: DiaryModel): Promise<DiaryModel> {
        try {
            const result = <DiaryModel>await this.petDiarySequelizeModel.sequelize?.transaction(async (t) => {

                const hasAddress = await this.addressRepository.findIdByAddress(
                    diary.street,
                    diary.number,
                    diary.postalCode,
                    diary.neighbourhood,
                );

                let addressId;
                if (hasAddress) {
                    addressId = hasAddress;
                } else {
                    await this.addressRepository.save(diary.id, diary.street, diary.number, diary.postalCode, diary.neighbourhood);
                    addressId = diary.id;
                }

                let savedDiary = await this.diaryRepository.save(diary, addressId);

                for (let id of diary.petId) {
                    await this.petDiarySequelizeModel.create({
                        pet_id: id,
                        diary_id: diary.id,
                    },{ transaction: t });
                }

                savedDiary.petId = diary.petId;

                return savedDiary;
            });

            return result;
        } catch (e) {
            throw (e);
        }
    }
}