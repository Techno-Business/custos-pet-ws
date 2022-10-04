import { Request, Response } from 'express';
import { validate } from "class-validator";
import {
    BaseCostRegisterDto,
    CostType,
    FeedCostRegisterDto,
    ServiceCostRegisterDto,
    VaccineCostRegisterDto
} from "./useCases/Register/CostRegisterDto";
import { CostRegisterUseCase } from "./useCases/Register/CostRegisterUseCase";

export class CostController {
    constructor(
        private costRegisterUseCase: CostRegisterUseCase,
    ) {
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
            } else {
                detailedCostRegisterDto = new FeedCostRegisterDto(baseCostRegisterDto, brand, weight, goal);
            }

            const costDetailsValidationErrors = await validate(detailedCostRegisterDto);
            if (costDetailsValidationErrors.length > 0) {
                return res.status(400).json(costDetailsValidationErrors.map(v => v.constraints));
            }

            const cost = await this.costRegisterUseCase.execute(detailedCostRegisterDto);

            return res.status(200).json(cost);
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