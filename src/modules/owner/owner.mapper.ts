import { OwnerModel } from "./owner.model";
import {OwnerDto} from "./owner.dto";

export class OwnerMapper {
    public toEntity (owner: OwnerModel): any {
        return {
            id: owner?._id?.toString(),
            first_name: owner._firstName,
            last_name: owner._lastName,
            email: owner._email.valueOf(),
            password: owner.password.valueOf(),
        }
    }

    public toModel (raw: any): OwnerModel {
        return new OwnerModel(
            raw.first_name,
            raw.last_name,
            raw.email,
            raw.password,
            raw.id,
        );
    }

    toDto(owner: OwnerModel): OwnerDto {
        return <OwnerDto> {
            id: owner._id,
            firstName: owner._firstName,
            lastName: owner._lastName,
            email: owner._email,
        }
    }
}