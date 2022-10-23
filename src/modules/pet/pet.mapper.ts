import { PetModel } from "./pet.model";
import { PetDto } from "./pet.dto";

export class PetMapper {
    public toEntity (pet: PetModel): any {
        return {
            id: pet?.id?.toString(),
            name: pet.name,
            photo: pet.photo,
            age: pet.age,
            sex: pet.sex,
            category: pet.category,
            owner_id: pet.ownerId.toString(),
        }
    }

    toModel(raw: any): PetModel {
        return new PetModel(
            raw.name,
            raw.photo,
            raw.age,
            raw.sex,
            raw.category,
            raw.ownerId,
            raw.id,
        );
    }

    toDto(pet: PetModel): PetDto {
        return <PetDto>{
            id: pet.id,
            name: pet.name,
            photo: pet.photo,
            age: pet.age,
            sex: pet.sex,
            category: pet.category,
            ownerId: pet.ownerId,
        }
    }
}