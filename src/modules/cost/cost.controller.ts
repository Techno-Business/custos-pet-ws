import { Request, Response } from 'express';
import { validate } from "class-validator";
import {
    BaseCostRegisterDto,
    CostType,
    FeedCostRegisterDto,
    ServiceCostRegisterDto,
    VaccineCostRegisterDto
} from "./useCases/Register/CostRegisterDto";

export class CostController {
    constructor() {
    }

    async create(req: Request, res: Response) {
        try {
            const {
                petId,
                type,
                date,
                price,
                goal, //TODO: change 'goal' to 'description'
                brand,
                weight,
                service_type,
            } = req.body;

            const baseCostRegisterDto = new BaseCostRegisterDto(
                petId,
                type,
                date,
                price,
            );

            const validationErrors = await validate(baseCostRegisterDto);
            if (validationErrors.length > 0) {
                return res.status(400).json(validationErrors.map(v => v.constraints));
            }

            let detailedCostRegisterDto: ServiceCostRegisterDto | VaccineCostRegisterDto | FeedCostRegisterDto;
            if (type == CostType.Service) {
                detailedCostRegisterDto = new ServiceCostRegisterDto(baseCostRegisterDto, service_type, goal);
            } else if (type == CostType.Vaccine) {
                detailedCostRegisterDto = new VaccineCostRegisterDto(baseCostRegisterDto, goal);
            } else if (type == CostType.Feed) {
                detailedCostRegisterDto = new FeedCostRegisterDto(baseCostRegisterDto, brand, weight, goal);
            }

            const costDetailsValidationErrors = await validate(detailedCostRegisterDto!);
            if (costDetailsValidationErrors.length > 0) {
                return res.status(400).json(costDetailsValidationErrors.map(v => v.constraints));
            }

            return res.status(200).json(detailedCostRegisterDto!);
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