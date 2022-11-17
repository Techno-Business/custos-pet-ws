import { DiaryModel } from "./diary.model";

export interface IDiaryRepository {
    save(diary: DiaryModel, addressId: string): Promise<DiaryModel>;
    findById(diaryId: string): Promise<DiaryModel | null>;
    findAllByIds(diaryIds: string[]): Promise<DiaryModel[] | null>;
    update(newDiary: DiaryModel, addressId: string): Promise<void>;
}