import { PetRegisterDto } from "./PetRegisterDto";
import { PetModel } from "../../pet.model";
import { IPetRepository } from "../../pet.repository";
import { v4 } from "uuid";
import aws from "../../../../services/aws";

export class PetRegisterUseCase {
    constructor(
        private petRepository: IPetRepository,
    ) {
    }

    async execute(data: PetRegisterDto, reqPhotoFile: Express.Multer.File | undefined): Promise<PetModel> {
        const photo = this.toRandomString(String(reqPhotoFile?.originalname));

        await this.sendToS3Service(reqPhotoFile?.buffer, photo);

        const pet = new PetModel(
            data.name,
            `pets/${photo}`,
            data.age,
            data.sex,
            data.species,
            data.breed,
            data.ownerId,
        );

        return await this.petRepository.save(pet);
    }

    private toRandomString(filename: string): string {
        const filenameParts = filename.split('.');
        const filenameExtension = filenameParts[filenameParts.length - 1];

        const uuid = v4();

        const randomFileString = `${uuid}.${filenameExtension}`;

        return randomFileString;
    }

    private async sendToS3Service(file: Buffer | undefined, filename: string) {
        const response = await aws.uploadToS3(file, filename);
        if (response.error) {
            throw new Error(response.message.message);
        }
    }
}