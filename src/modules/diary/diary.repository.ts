import { DiaryModel } from "./diary.model";

export interface IDiaryRepository {
    save(diary: DiaryModel): Promise<DiaryModel>;
    findById(diaryId: string): Promise<DiaryModel | null>;
}