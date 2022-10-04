import { CostController } from "./cost.controller";
import { CostRegisterUseCase } from "./useCases/Register/CostRegisterUseCase";
import { PetRepository } from "../../infra/sequelize/repositories/PetRepository";
import { PetMapper } from "../pet/pet.mapper";
import { CostMapper } from "./cost.mapper";
import PetSequelizeModel from '../../infra/sequelize/models/Pet';
import CostSequelizeModel from '../../infra/sequelize/models/Cost';

const petMapper = new PetMapper();

const costMapper = new CostMapper();

const petRepository = new PetRepository(
    PetSequelizeModel,
    CostSequelizeModel,
    petMapper,
    costMapper,
);

const costRegisterUseCase = new CostRegisterUseCase(petRepository);

const costController = new CostController(
    costRegisterUseCase,
);

export { costController };