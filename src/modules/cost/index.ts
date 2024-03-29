import { CostController } from "./cost.controller";
import { CostRegisterUseCase } from "./useCases/Register/CostRegisterUseCase";
import { PetRepository } from "../../infra/sequelize/repositories/PetRepository";
import { PetMapper } from "../pet/pet.mapper";
import { CostMapper } from "./cost.mapper";
import PetSequelizeModel from '../../infra/sequelize/models/Pet';
import CostSequelizeModel from '../../infra/sequelize/models/Cost';
import PetCostSequelizeModel from '../../infra/sequelize/models/PetCost';
import OwnerSequelizeModel from '../../infra/sequelize/models/Owner';
import DetailsSequelizeModel from '../../infra/sequelize/models/Details';
import { CostRepository } from "../../infra/sequelize/repositories/CostRepository";
import { PetCostRepository } from "../../infra/sequelize/repositories/PetCostRepository";
import { CostShowUseCase } from "./useCases/Show/CostShowUseCase";
import { OwnerRepository } from "../../infra/sequelize/repositories/OwnerRepository";
import { OwnerMapper } from "../owner/owner.mapper";
import { CostListUseCase } from "./useCases/List/CostListUseCase";
import { CostListFromOwnerUseCase } from "./useCases/ListFromOwner/CostListFromOwnerUseCase";
import { CostDeleteUseCase } from "./useCases/Delete/CostDeleteUseCase";

const ownerMapper = new OwnerMapper();

const ownerRepository = new OwnerRepository(
    OwnerSequelizeModel,
    ownerMapper,
);

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
    CostSequelizeModel,
    DetailsSequelizeModel,
    petRepository,
    costRepository,
);

const costRegisterUseCase = new CostRegisterUseCase(
    ownerRepository,
    petRepository,
    costRepository,
    petCostRepository,
);

const costShowUseCase = new CostShowUseCase(
    ownerRepository,
    costRepository,
);

const costListUseCase = new CostListUseCase(
    ownerRepository,
    petRepository,
    petCostRepository,
);

const costListFromOwnerUseCase = new CostListFromOwnerUseCase(
    ownerRepository,
    petCostRepository,
);

const costDeleteUseCase = new CostDeleteUseCase(
    ownerRepository,
    costRepository,
    petCostRepository,
);

const costController = new CostController(
    costRegisterUseCase,
    costShowUseCase,
    costListUseCase,
    costListFromOwnerUseCase,
    costDeleteUseCase,
    costMapper,
);

export { costController };