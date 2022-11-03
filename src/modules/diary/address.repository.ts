export interface IAddressRepository {
    findIdByAddress(street: string, number: string, postalCode: string, neighbourhood: string): Promise<string | null>;
    save(id: string, street: string, number: string, postalCode: string, neighbourhood: string): Promise<void>;
    deleteById(addressId: string): Promise<void>;
}
