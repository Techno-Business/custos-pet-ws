import { CostType } from "./useCases/Register/CostRegisterDto";
import { v4 } from "uuid";

export class CostModel {
    private _id?: string;
    private _petId: string[];
    private _type: CostType;
    private _date: string;
    private _price: number;
    private _description: string;
    private _brand?: string;
    private _weight?: number;
    private _serviceType?: string;

    constructor(
        petId: string[],
        type: CostType,
        date: string,
        price: number,
        description: string,
        brand?: string,
        weight?: number,
        serviceType?: string,
        id?: string,
    ) {
        if (!id) {
            this._id = v4();
        } else {
            this._id = id;
        }
        this._petId = petId;
        this._type = type;
        this._date = date;
        this._price = price;
        this._description = description;
        this._brand = brand;
        this._weight = weight;
        this._serviceType = serviceType;
    }

    get id(): string {
        return this._id as string;
    }

    set id(value: string) {
        this._id = value;
    }

    get petId(): string[] {
        return this._petId;
    }

    set petId(value: string[]) {
        this._petId = value;
    }

    get type(): CostType {
        return this._type;
    }

    set type(value: CostType) {
        this._type = value;
    }

    get date(): string {
        return this._date;
    }

    set date(value: string) {
        this._date = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get description(): string {
        return this._description as string;
    }

    set description(value: string) {
        this._description = value;
    }

    get brand(): string {
        return this._brand as string;
    }

    set brand(value: string) {
        this._brand = value;
    }

    get weight(): number {
        return this._weight as number;
    }

    set weight(value: number) {
        this._weight = value;
    }

    get serviceType(): string {
        return this._serviceType as string;
    }

    set serviceType(value: string) {
        this._serviceType = value;
    }
}