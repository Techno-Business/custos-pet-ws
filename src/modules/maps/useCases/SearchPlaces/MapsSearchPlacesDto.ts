import { MapsPlacesEnum } from "../../maps.places.enum";
import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty } from "class-validator";

export class MapsSearchPlacesDto {
    @IsNotEmpty()
    @IsLatitude()
    latitude: string;
    @IsNotEmpty()
    @IsLongitude()
    longitude: string;
    @IsNotEmpty()
    @IsEnum(MapsPlacesEnum)
    placeType: MapsPlacesEnum;

    constructor(
        latitude: string,
        longitude: string,
        placeType: MapsPlacesEnum
    ) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.placeType = placeType;
    }
}