import { v4 } from 'uuid';

export class OwnerModel {
    private _id?: string;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _password: string;
    private _passwordValidationKey?: string;


    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        id?: string,
        passwordValidationKey?: string
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
        this._passwordValidationKey = passwordValidationKey;
    }

    set id(value: string) {
        this._id = value;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    set email(value: string) {
        this._email = value;
    }

    set password(value: string) {
        this._password = value;
    }

    set passwordValidationKey(value: string){
        this._passwordValidationKey;
    }

    public get id() {
        return this._id as string;
    }

    public get firstName() {
        return this._firstName;
    }

    public get lastName() {
        return this._lastName;
    }

    public get email() {
        return this._email;
    }

    public get password() {
        return this._password;
    }

    public get passwordValidationKey(){
        
        return this._passwordValidationKey ? this._passwordValidationKey : '';
    }

}