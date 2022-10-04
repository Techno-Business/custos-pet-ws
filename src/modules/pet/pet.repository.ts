import { PetModel } from "./pet.model";
import { CostModel } from "../cost/cost.model";

export interface IPetRepository {
    save(pet: PetModel): Promise<PetModel>;
    findById(petId: string): Promise<PetModel | null>;
    findAllByOwnerId(ownerId: string): Promise<PetModel[] | null>;
    deleteById(petId: string): Promise<void>;
    existsById(petId: string): Promise<boolean>;
    findPhotoById(petId: string): Promise<string | null>;
    update(pet: PetModel): Promise<PetModel>;
    createCostById(petId: string, cost: CostModel): Promise<void>;
}