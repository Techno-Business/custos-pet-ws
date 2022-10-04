import { IPetRepository } from '../../../modules/pet/pet.repository';
import Pet from '../models/Pet';
import Cost from '../models/Cost';
import Details from '../models/Details';
import { PetModel } from "../../../modules/pet/pet.model";
import { PetMapper } from "../../../modules/pet/pet.mapper";
import { Model } from "sequelize";
import { CostModel } from "../../../modules/cost/cost.model";
import { CostMapper } from "../../../modules/cost/cost.mapper";

export class PetRepository implements IPetRepository {
    constructor(
        private petSequelizeModel: typeof Pet,
        private costSequelizeModel: typeof Cost,
        private petMapper: PetMapper,
        private costMapper: CostMapper,
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

        let updatedPet: any = await this.petSequelizeModel.update({
            name: rawPet.name,
            photo: rawPet.photo,
            age: rawPet.age,
            sex: rawPet.sex,
            species: rawPet.species,
            breed: rawPet.breed,
        },{
            where: {
                id: rawPet.id
            },
            returning: true,
            // @ts-ignore
            raw: true,
        });

        updatedPet = updatedPet[1][0];

        return this.petMapper.toModel(updatedPet);
    }

    async createCostById(petId: string, cost: CostModel): Promise<void> {
        const pet = await this.petSequelizeModel.findByPk(petId);

        const rawCost = this.costMapper.toEntity(cost);

        // await pet.addCost({
        //     id: rawCost.id,
        //     type: rawCost.type,
        //     date: rawCost.date,
        //     price: rawCost.price,
        //     details: [{
        //         id: rawCost.id,
        //         service_type: rawCost.service_type,
        //         brand: rawCost.brand,
        //         weight: rawCost.weight,
        //         description: rawCost.description,
        //     }]
        // }, {
        //     through: 'pets_costs',
        //     include: [ Details ],
        // })

        return Promise.resolve(undefined);
    }
}