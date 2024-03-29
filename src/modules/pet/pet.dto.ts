import { PetCategories } from "./pet.categories.enum";

export interface PetDto {
    id: string;
    name: string;
    photo: string;
    age: number;
    sex: string;
    category: PetCategories;
    ownerId: string;
}
