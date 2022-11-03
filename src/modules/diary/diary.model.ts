import { v4 } from "uuid";

export class DiaryModel {
    private _id?: string;
    private _petId: string[];
    private _title: string;
    private _date: string;
    private _addressId?: string;
    private _street?: string;
    private _number?: string
    private _postalCode?: string;
    private _neighbourhood?: string;

    constructor(
        petId: string[],
        title: string,
        date: string,
        street?: string,
        number?: string,
        postalCode?: string,
        neighbourhood?: string,
        id?: string,
        addressId?: string,
    ) {
        if (!id) {
            this._id = v4();
        } else {
            this._id = id;
        }
        this._petId = petId;
        this._title = title;
        this._date = date;
        this._addressId = addressId;
        this._street = street;
        this._number = number;
        this._postalCode = postalCode;
        this._neighbourhood = neighbourhood;
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

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get date(): string {
        return this._date;
    }

    set date(value: string) {
        this._date = value;
    }

    get addressId(): string {
        return this._addressId as string;
    }

    set addressId(value: string) {
        this._addressId = value;
    }

    get street(): string {
        return this._street as string;
    }

    set street(value: string) {
        this._street = value;
    }

    get number(): string {
        return this._number as string;
    }

    set number(value: string) {
        this._number = value;
    }

    get postalCode(): string {
        return this._postalCode as string;
    }

    set postalCode(value: string) {
        this._postalCode = value;
    }

    get neighbourhood(): string {
        return this._neighbourhood as string;
    }

    set neighbourhood(value: string) {
        this._neighbourhood = value;
    }
}