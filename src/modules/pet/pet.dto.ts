import { PetSpecies } from "./pet.species.enum";

export interface PetDto {
    id: string;
    name: string;
    photo: string;
    age: number;
    sex: string;
    species: PetSpecies;
    breed: string;
    ownerId: string;
}
