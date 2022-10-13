import { OwnerSignUpDto } from "./OwnerSignUpDto";
import { OwnerModel } from "../../owner.model";
import { IOwnerRepository } from "../../owner.repository";
import bcrypt from "bcrypt";

export class OwnerSignUpUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
    ) {
    }

    async execute(data: OwnerSignUpDto): Promise<OwnerModel> {
        if (data.password != data.passwordConfirmation) {
            throw new Error('Password confirmation must be the same as password.');
        }

        const ownerExists = await this.ownerRepository.existsByEmail(data.email);

        if (ownerExists) {
            throw new Error('Owner already exists.');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const owner = new OwnerModel(
            data.firstName,
            data.lastName,
            data.email,
            hashedPassword,
        )

        return await this.ownerRepository.save(owner);
    }
}