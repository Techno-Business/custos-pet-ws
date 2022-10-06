import { CostController } from "./cost.controller";
import { CostRegisterUseCase } from "./useCases/Register/CostRegisterUseCase";
import { PetRepository } from "../../infra/sequelize/repositories/PetRepository";
import { PetMapper } from "../pet/pet.mapper";
import { CostMapper } from "./cost.mapper";
import PetSequelizeModel from '../../infra/sequelize/models/Pet';
import CostSequelizeModel from '../../infra/sequelize/models/Cost';
import PetCostSequelizeModel from '../../infra/sequelize/models/PetCost';
import { CostRepository } from "../../infra/sequelize/repositories/CostRepository";
import { PetCostRepository } from "../../infra/sequelize/repositories/PetCostRepository";

const petMapper = new PetMapper();

const costMapper = new CostMapper();

const petRepository = new PetRepository(
    PetSequelizeModel,
    petMapper,
);

const costRepository = new CostRepository(
    CostSequelizeModel,
    costMapper,
);

const petCostRepository = new PetCostRepository(
    PetCostSequelizeModel,
    petRepository,
    costRepository,
);

const costRegisterUseCase = new CostRegisterUseCase(
    petRepository,
    costRepository,
    petCostRepository,
);

const costController = new CostController(
    costRegisterUseCase,
);

export { costController };