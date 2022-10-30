import { IDiaryRepository } from "../../../modules/diary/diary.repository";
import { DiaryModel } from "../../../modules/diary/diary.model";
import Diary from '../models/Diary'
import Address from '../models/Address';
import { DiaryMapper } from "../../../modules/diary/diary.mapper";

export class DiaryRepository implements IDiaryRepository {
    constructor(
        private diarySequelizeModel: typeof Diary,
        private diaryMapper: DiaryMapper,
    ) {
    }

    async save(diary: DiaryModel): Promise<DiaryModel> {
        const rawDiary = this.diaryMapper.toEntity(diary);

        const savedDiary = await this.diarySequelizeModel.create({
            id: rawDiary.id,
            title: rawDiary.title,
            date: rawDiary.date,
            addresses: [{
                id: rawDiary.id,
                street: rawDiary.street,
                number: rawDiary.number,
                postal_code: rawDiary.postal_code,
                neighbourhood: rawDiary.neighbourhood,
            }],
        },{
            include: {
                model: Address,
                as: 'addresses',
            }
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
        diary ? hasDiary = this.diaryMapper.toModel(diary) : hasDiary = null;

        return hasDiary;
    }

}