import { OwnerModel } from "./owner.model";
import { OwnerDto } from "./owner.dto";

export class OwnerMapper {
    public toEntity (owner: OwnerModel): any {
        return {
            id: owner?.id?.toString(),
            first_name: owner.firstName,
            last_name: owner.lastName,
            email: owner.email.valueOf(),
            password: owner.password.valueOf(),
            password_validation_key: owner?.passwordValidationKey ? owner?.passwordValidationKey : ''
        }
    }

    public toModel (raw: any): OwnerModel {
        return new OwnerModel(
            raw.first_name,
            raw.last_name,
            raw.email,
            raw.password,
            raw.id,
            raw.password_validation_key,
        );
    }

    toDto(owner: OwnerModel): OwnerDto {
        return <OwnerDto> {
            id: owner.id,
            firstName: owner.firstName,
            lastName: owner.lastName,
            email: owner.email,
            passwordValidationKey: owner.passwordValidationKey,
        }
    }
}