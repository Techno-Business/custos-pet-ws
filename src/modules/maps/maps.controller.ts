import { Request, Response } from 'express';
import { MapsSearchPlacesDto } from "./useCases/SearchPlaces/MapsSearchPlacesDto";
import { validate } from "class-validator";
import { MapsSearchPlacesUseCase } from "./useCases/SearchPlaces/MapsSearchPlacesUseCase";

export class MapsController {
    constructor(
        private mapsSearchPlacesUseCase: MapsSearchPlacesUseCase,
    ) {
    }

    async searchPlaces(req: Request, res: Response) {
        try {
            const { latitude, longitude, placetype } = req.query as any;

            const mapsSearchPlacesDto = new MapsSearchPlacesDto(
                latitude,
                longitude,
                placetype,
            );

            const validationErrors = await validate(mapsSearchPlacesDto);
            if (validationErrors.length > 0) {
                return res.status(400).json(validationErrors.map(v => v.constraints));
            }

            const placesDto = await this.mapsSearchPlacesUseCase.execute(mapsSearchPlacesDto);

            return res.status(200).json(placesDto);
        } catch (e) {
            console.log(e);
            if (e instanceof Error) {
                return res.status(400).json({
                    message: e.message
                });
            } else {
                return res.status(400).json('An unexpected error has occurred.');
            }
        }
    }
}