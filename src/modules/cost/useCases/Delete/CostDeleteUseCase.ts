import { IOwnerRepository } from "../../../owner/owner.repository";
import { ICostRepository } from "../../cost.repository";
import {CostModel} from "../../cost.model";

export class CostDeleteUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
        private costRepository: ICostRepository,
    ) {
    }

    async execute(ownerId: string, costId: string): Promise<string> {
        if (!await this.ownerRepository.existsById(ownerId)) {
            throw new Error("Nonexistent owner of id " + ownerId);
        }

        const cost = await this.costRepository.findById(costId);

        if (!cost) {
            throw new Error("Nonexistent cost of id " + costId);
        }

        return "hello there, " + ownerId + ", " + costId;
    }
}