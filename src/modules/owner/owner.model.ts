import { v4 } from 'uuid';

export class OwnerModel {
    private _id?: string;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _password: string;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        id?: string,
    ) {
        if (!id) {
            this._id = v4();
        } else {
            this._id = id;
        }
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
    }

    public get password() {
        return this._password;
    }
}