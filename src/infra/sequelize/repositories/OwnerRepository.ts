import { IOwnerRepository } from "../../../modules/owner/owner.repository";
import Owner from '../models/Owner'
import { OwnerModel } from "../../../modules/owner/owner.model";
import { OwnerMapper } from "../../../modules/owner/owner.mapper";

export class OwnerRepository implements IOwnerRepository {
    constructor(
        private ownerSequelizeModel: typeof Owner,
        private ownerMapper: OwnerMapper,
    ) {
    }


    async existsByPasswordValidationKey(passwordValidationKey: string): Promise<boolean> {
        let owner = await this.ownerSequelizeModel.findOne({where: {
            passwordValidationKey: passwordValidationKey
        }});
       console.log(owner);

        return !!owner;
    }

    async existsByEmail(email: string): Promise<boolean> {
        const owner = await this.ownerSequelizeModel.findOne({
            where: {
                email: email,
            },
        });

        return !!owner;
    }

    async existsById(id: string): Promise<boolean> {
        const owner = await this.ownerSequelizeModel.findOne({
            where: {
                id: id,
            },
        });

        return !!owner;
    }

    async save(owner: OwnerModel): Promise<OwnerModel> {
        const ownerEntity = this.ownerMapper.toEntity(owner);

        return this.ownerMapper.toModel(
            await this.ownerSequelizeModel.create(ownerEntity)
        );
    }

    async update(owner: OwnerModel, toUpdate: any):Promise<void>{
        console.log(toUpdate)
        await this.ownerSequelizeModel.update(toUpdate, {where:{id: owner.id }});
    }

    async findByEmail(email: string): Promise<OwnerModel | null> {
        const owner = await this.ownerSequelizeModel.findOne({
            where: {
                email: email,
            },
        });

        let hasOwner: OwnerModel | null;
        owner ? hasOwner = this.ownerMapper.toModel(owner) : hasOwner = null;

        return hasOwner;
    }

}