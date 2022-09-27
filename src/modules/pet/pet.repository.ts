import { PetModel } from "./pet.model";

export interface IPetRepository {
    save(pet: PetModel): Promise<PetModel>;
}