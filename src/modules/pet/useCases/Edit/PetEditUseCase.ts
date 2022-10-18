import { IPetRepository } from "../../pet.repository";
import { PetRegisterDto } from "../Register/PetRegisterDto";
import { PetModel } from "../../pet.model";
import aws from "../../../../services/aws";

export class PetEditUseCase {
    constructor(
        private petRepository: IPetRepository,
    ) {
    }

    async execute(
        petId: string,
        petRegisterDto: PetRegisterDto,
        reqPhotoFile: Express.Multer.File | undefined
    ): Promise<PetModel> {
        const pet = await this.petRepository.findById(petId);

        if (!pet) {
            throw new Error("Pet not found.");
        }

        pet.name = petRegisterDto.name;
        pet.age = petRegisterDto.age;
        pet.sex = petRegisterDto.sex;
        pet.species = petRegisterDto.species;
        pet.breed = petRegisterDto.breed;

        if (reqPhotoFile) {
            const filenameParts = pet.photo.split('/');
            const photo = filenameParts[filenameParts.length - 1];

            await this.sendToS3Service(reqPhotoFile.buffer, photo);
        }

        return await this.petRepository.update(pet);
    }

    private async sendToS3Service(file: Buffer | undefined, filename: string) {
        const response = await aws.uploadToS3(file, filename);
        if (response.error) {
            throw new Error(response.message.message);
        }
    }
}