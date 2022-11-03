
export class DiaryDeleteUseCase {
    constructor() {
    }

    execute(ownerId: string, diaryId: string) {
        return "hello there, " + ownerId + ", " + diaryId;
    }
}