
export class DiaryUpdateUseCase {
    constructor() {
    }

    async execute(ownerId: string, diaryId: string) {
        return "hello there, " + ownerId + ", " + diaryId;
    }
}