import { Request, Response } from 'express';

export class MapsController {
    constructor() {
    }

    async searchPlaces(req: Request, res: Response) {
        try {
            const latitude = req.query.latitude;
            const longitude = req.query.longitude;
            const placeType = req.query.placetype;

            return res.status(200).json("hello there, " + latitude + longitude + placeType);
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