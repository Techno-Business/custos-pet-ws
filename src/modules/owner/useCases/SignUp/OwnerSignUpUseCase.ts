import { OwnerSignUpDto } from "./OwnerSignUpDto";
import { OwnerModel } from "../../owner.model";
import { IOwnerRepository } from "../../owner.repository";

export class OwnerSignUpUseCase {
    constructor(
        private ownerRepository: IOwnerRepository
    ) {
    }

    async execute(data: OwnerSignUpDto): Promise<OwnerModel> {

        const ownerExists = await this.ownerRepository.existsByEmail(data.email);

        if (ownerExists) {
            throw new Error('Owner already exists.');
        }

        const owner = new OwnerModel(
            data.firstName,
            data.lastName,
            data.email,
            data.password,
        )

        return await this.ownerRepository.save(owner);
    }
}