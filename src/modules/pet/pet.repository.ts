import { PetModel } from "./pet.model";

export interface IPetRepository {
    save(pet: PetModel): Promise<PetModel>;
    findById(petId: string): Promise<PetModel | null>;
    findAllByOwnerId(ownerId: string): Promise<PetModel[] | null>;
    deleteById(petId: string): Promise<void>;
    existsById(petId: string): Promise<boolean>;
    findPhotoById(petId: string): Promise<string | null>;
    update(pet: PetModel): Promise<PetModel>;
}