import { IPetRepository } from "../../pet.repository";
import aws from "../../../../services/aws";

export class PetRemoveUseCase {
    constructor(
        private petRepository: IPetRepository,
    ) {
    }

    async execute(petId: string) {
        const photo = await this.petRepository.findPhotoById(petId);

        if (!photo) {
            throw new Error('Pet does not exist.')
        }

        const photoFilename = Object.values(photo).toString();

        await this.deleteFromS3Service(photoFilename);

        await this.petRepository.deleteById(petId);
    }

    private async deleteFromS3Service(filename: string) {
        await aws.deleteFileS3(filename);
    }
}