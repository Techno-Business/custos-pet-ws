import { IPetDiaryRepository } from "../../../modules/diary/pet.diary.repository";
import { DiaryModel } from "../../../modules/diary/diary.model";
import PetDiary from '../models/PetDiary'
import { IDiaryRepository } from "../../../modules/diary/diary.repository";
import { IAddressRepository } from "../../../modules/diary/address.repository";
import { v4 } from "uuid";
import Diary from "../models/Diary";

export class PetDiaryRepository implements IPetDiaryRepository {
    constructor(
        private petDiarySequelizeModel: typeof PetDiary,
        private diarySequelizeModel: typeof Diary,
        private diaryRepository: IDiaryRepository,
        private addressRepository: IAddressRepository,
    ) {
    }

    async save(diary: DiaryModel): Promise<DiaryModel> {
        try {
            const result = <DiaryModel>await this.petDiarySequelizeModel.sequelize?.transaction(async (t) => {

                const addressId: string = await this.findAddressIdOrCreate(diary);

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

    async findAllByPetId(petId: string): Promise<DiaryModel[] | null> {
        try {
            const result = <DiaryModel[]> await this.petDiarySequelizeModel.sequelize?.transaction(async (t) => {
                const diariesIds = await this.petDiarySequelizeModel.findAll({
                    attributes: ['diary_id'],
                    where: {
                        pet_id: petId,
                    },
                    group: ['diary_id'],
                    raw: true,
                    transaction: t,
                });

                const areDiariesIdsEmpty = Object.keys(diariesIds).length === 0;
                if (areDiariesIdsEmpty) {
                    return ;
                }

                const diariesIdsList = diariesIds.map((d) => {
                    return Object.values(d)[0];
                });
                const diaries = await this.diaryRepository.findAllByIds(diariesIdsList);

                return diaries;
            });

            return result;
        } catch (e) {
            throw (e);
        }
    }

    async update(currentDiary: DiaryModel, newDiary: DiaryModel): Promise<void> {
        try {
            await this.petDiarySequelizeModel.sequelize?.transaction(async (t) => {
                const removedPetIds = currentDiary.petId.filter((id) => !newDiary.petId.includes(id));
                const addedPetIds = newDiary.petId.filter((id) => !currentDiary.petId.includes(id));

                if (removedPetIds.length > 0) {
                    await this.petDiarySequelizeModel.destroy({
                        where: {
                            pet_id: removedPetIds
                        },
                        transaction: t,
                    });
                }

                if (addedPetIds.length > 0) {
                    let addedPetDiary: { pet_id: string, diary_id: string }[] = [];
                    for (let id of addedPetIds) {
                        const petDiaryObj = {
                            pet_id: id,
                            diary_id: newDiary.id,
                        }
                        addedPetDiary.push(petDiaryObj);
                    }

                    await this.petDiarySequelizeModel.bulkCreate(addedPetDiary, { transaction: t });
                }

                const addressId = await this.findAddressIdOrCreate(newDiary);

                await this.diaryRepository.update(newDiary, addressId);
            });
        } catch (e) {
            throw (e);
        }
    }

    async findAddressIdOrCreate(diary: DiaryModel): Promise<string> {
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
            const uuid = v4();
            addressId = uuid;
            await this.addressRepository.save(addressId, diary.street, diary.number, diary.postalCode, diary.neighbourhood);
        }

        return addressId;
    }

    async deletePetDiary(petId: string, diaryId: string): Promise<void> {
        await this.petDiarySequelizeModel.destroy({
            where: {
                pet_id: petId,
                diary_id: diaryId,
            }
        });
    }

    async deleteDiary(diary: DiaryModel): Promise<void> {
        //delete pets diaries
        //delete diaries
        //delete addresses
        try {
            await this.petDiarySequelizeModel.sequelize?.transaction(async (t) => {
                await this.petDiarySequelizeModel.destroy({
                    where: {
                        diary_id: diary.id,
                    },
                    transaction: t,
                });

                await this.diarySequelizeModel.destroy({
                    where: {
                        id: diary.id,
                    },
                    transaction: t,
                });
                //TODO:
                //contar ocorrências do addressId na tabela diaries
                //se ocorrências for maior que 1 não deletar
                //se ocorrências for 1, deletar address

                //await this.addressRepository.deleteById(diary.addressId);
            });
        } catch (e) {
            throw (e);
        }
    }
}