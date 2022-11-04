import { OwnerModel } from "./owner.model";

export interface IOwnerRepository {
    save(owner: OwnerModel): Promise<OwnerModel>;
    existsByEmail(email: string): Promise<boolean>;
    findByEmail(email: string): Promise<OwnerModel | null>;
    existsByPasswordValidationKey(passwordValidationKey: string): Promise<boolean>;
    existsById(ownerId: string): Promise<boolean>;
    update(owner: OwnerModel, toUpdate: any):Promise<void>;
}