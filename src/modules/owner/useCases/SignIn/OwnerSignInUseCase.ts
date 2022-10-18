import { IOwnerRepository } from "../../owner.repository";
import { OwnerSignInDto } from "./OwnerSignInDto";
import { OwnerModel } from "../../owner.model";
import bcrypt from "bcrypt";

export class OwnerSignInUseCase {
    constructor(
        private ownerRepository: IOwnerRepository,
    ) {
    }

    async execute(data: OwnerSignInDto): Promise<OwnerModel> {
        const owner: OwnerModel | null = await this.ownerRepository.findByEmail(data.email);
        const signInErrorMessage: string = "Incorrect email address or password."

        if (!owner) {
            throw new Error(signInErrorMessage);
        }

        const isPasswordValid = await bcrypt.compare(data.password, owner.password)

        if (!isPasswordValid) {
            throw new Error(signInErrorMessage);
        }

        return owner;
    }
}