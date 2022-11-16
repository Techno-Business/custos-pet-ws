import { DiaryModel } from "./diary.model";
import { DiaryDto } from "./diary.dto";

export class DiaryMapper {
    public toEntity (diary: DiaryModel): any {
        return {
            id: diary?.id.toString(),
            pet_id: diary.petId,
            title: diary.title,
            date: diary.date,
            address_id: diary?.addressId,
            street: diary?.street,
            number: diary?.number,
            postal_code: diary?.postalCode,
            neighbourhood: diary?.neighbourhood,
        }
    }

    public toModel (raw: any): DiaryModel {
        return new DiaryModel(
            raw.pet_id,
            raw.title,
            raw.date,
            raw['addresses.street'],
            raw['addresses.number'],
            raw['addresses.postal_code'],
            raw['addresses.neighbourhood'],
            raw.id,
            raw['addresses.id'],
        )
    }

    public toDto (diary: DiaryModel): DiaryDto {
        return <DiaryDto> {
            id: diary.id,
            petId: diary.petId,
            title: diary.title,
            date: diary.date,
            street: diary.street,
            number: diary.number,
            postalCode: diary.postalCode,
            neighbourhood: diary.neighbourhood,
        }
    }
}