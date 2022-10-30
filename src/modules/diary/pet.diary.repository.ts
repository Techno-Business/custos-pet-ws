import { DiaryModel } from "./diary.model";

export interface IPetDiaryRepository {
    save(diary: DiaryModel): Promise<DiaryModel>;
}