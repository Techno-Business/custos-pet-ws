import { CostController } from "./cost.controller";
import {CostRegisterUseCase} from "./useCases/Register/CostRegisterUseCase";

const costRegisterUseCase = new CostRegisterUseCase();

const costController = new CostController(
    costRegisterUseCase,
);

export { costController };