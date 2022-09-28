import { IPetRepository } from '../../../modules/pet/pet.repository';
import Pet from '../models/Pet';
import { PetModel } from "../../../modules/pet/pet.model";
import { PetMapper } from "../../../modules/pet/pet.mapper";
import { Model } from "sequelize";

export class PetRepository implements IPetRepository {
    constructor(
        private petSequelizeModel: typeof Pet,
        private petMapper: PetMapper,
    ) {
    }

    async save(pet: PetModel): Promise<PetModel> {
        const petEntity = this.petMapper.toEntity(pet);

        return this.petMapper.toModel(
            await this.petSequelizeModel.create(petEntity)
        );
    }

    async findById(petId: string): Promise<PetModel | null> {
        const pk = petId;

        const pet = await this.petSequelizeModel.findByPk(pk);

        let hasPet: PetModel | null;
        pet ? hasPet = this.petMapper.toModel(pet) : hasPet = null;

        return hasPet;
    }

    async findAllByOwnerId(ownerId: string): Promise<PetModel[] | null> {
        const pets = await this.petSequelizeModel.findAll({
            where: {
                owner_id: ownerId,
            },
        });

        let hasPets: PetModel[] | null;
        pets ? hasPets = pets.map((pet: Model<PetModel>) => this.petMapper.toModel(pet)) : hasPets = null;

        return hasPets;
    }

    async deleteById(petId: string): Promise<void> {
        await this.petSequelizeModel.destroy({
            where: {
                id: petId,
            }
        });
    }

    async existsById(petId: string): Promise<boolean> {
        const pet = await this.petSequelizeModel.findOne({
            where: {
                id: petId,
            },
        });

        return !!pet;
    }

    async findPhotoById(petId: string): Promise<string | null> {
        const photo = <string | null> await this.petSequelizeModel.findOne({
            attributes: ['photo'],
            raw: true,
            where: {
                id: petId,
            }
        });

        return photo;
    }

    async update(pet: PetModel): Promise<PetModel> {
        const rawPet = this.petMapper.toEntity(pet);
        console.log(rawPet);

        //TODO: change to raw query
        const updatedPet = await this.petSequelizeModel.update({ ...rawPet }, {
            where: {
                id: rawPet.id,
            },
            returning: true,
            // @ts-ignore
            raw: true,
        });
        console.log(updatedPet);

        return this.petMapper.toModel(updatedPet);
    }
}