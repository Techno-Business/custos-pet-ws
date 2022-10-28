import { DiaryModel } from "./diary.model";
import { DiaryDto } from "./diary.dto";

export class DiaryMapper {
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