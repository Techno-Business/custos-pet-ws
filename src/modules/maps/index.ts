import { MapsController } from "./maps.controller";
import { MapsSearchPlacesUseCase } from "./useCases/SearchPlaces/MapsSearchPlacesUseCase";

const mapsSearchPlacesUseCase = new MapsSearchPlacesUseCase();

const mapsController = new MapsController(
    mapsSearchPlacesUseCase,
);

export { mapsController };