import { v4 } from 'uuid';

export class OwnerModel {
    public id?: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        id?: string,
    ) {
        if (!id) {
            this.id = v4();
        } else {
            this.id = id;
        }
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}