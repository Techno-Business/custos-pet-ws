import { IOwnerRepository } from "../../owner.repository";
import {OwnerSignInDto} from "./OwnerSignInDto";
import {OwnerModel} from "../../owner.model";
import bcrypt from "bcrypt";

export class OwnerSignInUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
    ) {
    }

    async execute(data: OwnerSignInDto): Promise<OwnerModel> {
        const owner: OwnerModel = await this.ownerRepository.findByEmail(data.email);

        const isPasswordValid = await bcrypt.compare(data.password, owner.password)

        if (!isPasswordValid) {
            throw new Error('Incorrect email address or password.');
        }

        return owner;
    }
}