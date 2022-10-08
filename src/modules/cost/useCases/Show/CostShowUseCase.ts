
export class CostShowUseCase {
    async execute(ownerId: string, costId: string) {

        return "hello there, " + ownerId + ". " + costId;
    }
}