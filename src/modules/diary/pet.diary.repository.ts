import { DiaryModel } from "./diary.model";

export interface IPetDiaryRepository {
    save(diary: DiaryModel): Promise<DiaryModel>;
    findAllByPetId(petId: string): Promise<DiaryModel[] | null>;
    update(currentDiary: DiaryModel, newDiary: DiaryModel): Promise<void>;
    deletePetDiary(petId: string, diaryId: string): Promise<void>;
}