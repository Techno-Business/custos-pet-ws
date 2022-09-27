import { v4 } from "uuid";

export class PetModel {
    private _id?: string;
    private _name: string;
    private _photo: string;
    private _age: number;
    private _sex: string;
    private _species: string;
    private _breed: string;
    private _ownerId: string;

    constructor(
        id: string,
        name: string,
        photo: string,
        age: number,
        sex: string,
        species: string,
        breed: string,
        ownerId: string,
    ) {
        if (!id) {
            this._id = v4();
        } else {
            this._id = id;
        }
        this._name = name;
        this._photo = photo;
        this._age = age;
        this._sex = sex;
        this._species = species;
        this._breed = breed;
        this._ownerId = ownerId;
    }

    get id(): string {
        return this._id as string;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get photo(): string {
        return this._photo;
    }

    set photo(value: string) {
        this._photo = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    get sex(): string {
        return this._sex;
    }

    set sex(value: string) {
        this._sex = value;
    }

    get species(): string {
        return this._species;
    }

    set species(value: string) {
        this._species = value;
    }

    get breed(): string {
        return this._breed;
    }

    set breed(value: string) {
        this._breed = value;
    }

    get ownerId(): string {
        return this._ownerId;
    }

    set ownerId(value: string) {
        this._ownerId = value;
    }
}