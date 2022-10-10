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
import { CostMapper } from "./cost.mapper";
import { CostShowUseCase } from "./useCases/Show/CostShowUseCase";
import {CostListUseCase} from "./useCases/List/CostListUseCase";

export class CostController {
    constructor(
        private costRegisterUseCase: CostRegisterUseCase,
        private costShowUseCase: CostShowUseCase,
        private costListUseCase: CostListUseCase,
        private costMapper: CostMapper,
    ) {
    }

    async create(req: Request, res: Response) {
        try {
            const ownerId = req.params.ownerId;

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

            const cost = await this.costRegisterUseCase.execute(ownerId, detailedCostRegisterDto);
            const costDto = this.costMapper.toDto(cost);

            return res.status(201).json(costDto);
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

    async show(req: Request, res: Response) {
        try {
            const ownerId = req.params.ownerId;

            const costId = req.params.id;

            const cost = await this.costShowUseCase.execute(ownerId, costId);
            const costDto = this.costMapper.toDto(cost);

            return res.status(200).json(costDto);
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

    index(req: Request, res: Response) {
        try {
            const ownerId = req.params.ownerId;

            const costs = this.costListUseCase.execute(ownerId);

            return res.status(200).json(costs);
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