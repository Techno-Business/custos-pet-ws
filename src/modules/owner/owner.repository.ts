import { OwnerModel } from "./owner.model";

export interface IOwnerRepository {
    save(owner: OwnerModel): Promise<OwnerModel>;
    existsByEmail(email: string): Promise<boolean>;
    findByEmail(email: string): Promise<OwnerModel>
}