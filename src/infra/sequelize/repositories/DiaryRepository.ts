import { IDiaryRepository } from "../../../modules/diary/diary.repository";
import { DiaryModel } from "../../../modules/diary/diary.model";
import Diary from '../models/Diary'
import Address from '../models/Address';
import { DiaryMapper } from "../../../modules/diary/diary.mapper";
import { Model } from "sequelize";
import PetDiary from "../models/PetDiary";

export class DiaryRepository implements IDiaryRepository {
    constructor(
        private diarySequelizeModel: typeof Diary,
        private petDiarySequelizeModel: typeof PetDiary,
        private diaryMapper: DiaryMapper,
    ) {
    }

    async save(diary: DiaryModel, addressId: string): Promise<DiaryModel> {
        const rawDiary = this.diaryMapper.toEntity(diary);

        const savedDiary = await this.diarySequelizeModel.create({
            id: rawDiary.id,
            title: rawDiary.title,
            date: rawDiary.date,
            address_id: addressId,
        });

        const savedDiaryLoaded = await this.findById(savedDiary.getDataValue('id'));

        return <DiaryModel>savedDiaryLoaded;
    }

    async findById(diaryId: string): Promise<DiaryModel | null> {
        const pk = diaryId;

        const diary = await this.diarySequelizeModel.findByPk(pk, {
            include: {
                model: Address,
                as: 'addresses',
            },
            raw: true,
        });

        let hasDiary: DiaryModel | null;
        if (diary) {
            const petsIds = await this.petDiarySequelizeModel.findAll({
                attributes: ['pet_id'],
                where: {
                    diary_id: diaryId,
                },
                group: ['pet_id'],
                raw: true,
            });

            const petsIdsList = petsIds.map((p) => {
                return Object.values(p)[0];
            });

            hasDiary = this.diaryMapper.toModel(diary);

            hasDiary.petId = petsIdsList;
        } else {
            hasDiary = null;
        }

        return hasDiary;
    }

    async findAllByIds(diariesIds: string[]): Promise<DiaryModel[] | null> {
        const diaries = await this.diarySequelizeModel.findAll({
            where: {
                id: diariesIds,
            },
            include: {
                model: Address,
                as: 'addresses',
            },
            raw: true,
        });

        let hasDiaries: DiaryModel[] | null;
        diaries ? hasDiaries = diaries.map((diary: Model<DiaryModel>) => this.diaryMapper.toModel(diary)) : hasDiaries = null;

        return hasDiaries;
    }

}