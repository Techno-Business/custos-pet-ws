
export class DiaryListUseCase {
    constructor() {
    }

    execute(ownerId: string, petId: string) {
        return "hello there, " + ownerId + ", " + petId;
    }
}