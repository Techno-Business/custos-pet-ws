import { IAddressRepository } from "../../../modules/diary/address.repository";
import Address from "../models/Address";

export class AddressRepository implements IAddressRepository {
    constructor(
        private addressSequelizeModel: typeof Address,
    ) {
    }

    async findIdByAddress(street: string, number: string, postalCode: string, neighbourhood: string): Promise<string | null> {
        const id = <string | null> await this.addressSequelizeModel.findOne({
            attributes: ['id'],
            raw: true,
            where: {
                street: street,
                number: number,
                postal_code: postalCode,
                neighbourhood: neighbourhood,
            }
        });

        let hasId: string | null;
        id ? hasId = Object.values(id)[0] : hasId = null;

        return hasId;
    }

    async save(id: string, street: string, number: string, postalCode: string, neighbourhood: string): Promise<void> {
        await this.addressSequelizeModel.create({
            id: id,
            street: street,
            number: number,
            postal_code: postalCode,
            neighbourhood: neighbourhood,
        });
    }

    async deleteById(addressId: string): Promise<void> {
        await this.addressSequelizeModel.destroy({
            where: {
                id: addressId,
            }
        });
    }

}