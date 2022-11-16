import { MapsSearchPlacesDto } from "./MapsSearchPlacesDto";
import axios from "axios";
require('dotenv').config();

const placesApiKey = process.env.GOOGLE_PLACES_KEY;

export class MapsSearchPlacesUseCase {
    constructor() {
    }

    async execute(dtoData: MapsSearchPlacesDto) {
        const latitude = dtoData.latitude;
        const longitude = dtoData.longitude;
        const placeType = dtoData.placeType;

        const fetchPlacesData = await this.fetchPlaces(latitude, longitude, placeType);

        const placesDto = fetchPlacesData.map((e: any) => ({
            id: e.place_id,
            name: e.name,
            latitude: e.geometry.location.lat,
            longitude: e.geometry.location.lng
        }));

        return placesDto;
    }

    private async fetchPlaces(latitude: string, longitude: string, placeType: string): Promise<any> {
        const placesApiBaseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
        const mapPlacesApiStatus = new Map<string, string>([
            ["ZERO_RESULTS", "This location has no point of interest nearby"],
            ["INVALID_REQUEST", "Something went wrong. Contact developers."],
            ["OVER_QUERY_LIMIT", "Something went wrong. Contact developers."],
            ["REQUEST_DENIED", "Something went wrong. Contact developers."],
            ["UNKNOWN_ERROR", "An unknown error has happened while contacting Google Places"],
        ]);

        const {data, status} = await axios.get(
            `${placesApiBaseUrl}?location=${latitude},${longitude}&rankby=distance&type=${placeType}&key=${placesApiKey}`
        ).catch((error) => {
            throw new Error(error);
        });

        if (data.status != "OK") {
            throw new Error(mapPlacesApiStatus.get(data.status));
        }

        return data.results;
    }
}