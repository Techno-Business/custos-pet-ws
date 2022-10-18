import { PetController } from "./pet.controller";
import { PetRegisterUseCase } from "./useCases/Register/PetRegisterUseCase";
import { OwnerRepository } from "../../infra/sequelize/repositories/OwnerRepository";
import { OwnerMapper } from "../owner/owner.mapper";
import { PetRepository } from "../../infra/sequelize/repositories/PetRepository";
import PetSequelizeModel from '../../infra/sequelize/models/Pet';
import OwnerSequelizeModel from '../../infra/sequelize/models/Owner';
import { PetMapper } from "./pet.mapper";
import { PetShowUseCase } from "./useCases/Show/PetShowUseCase";
import { PetListUseCase } from "./useCases/List/PetListUseCase";
import { PetRemoveUseCase } from "./useCases/Remove/PetRemoveUseCase";
import { PetEditUseCase } from "./useCases/Edit/PetEditUseCase";

const ownerMapper = new OwnerMapper();

const ownerRepository = new OwnerRepository(
    OwnerSequelizeModel,
    ownerMapper,
);

const petMapper = new PetMapper();

const petRepository = new PetRepository(
    PetSequelizeModel,
    petMapper,
);

const petRegisterUseCase = new PetRegisterUseCase(
    ownerRepository,
    petRepository,
);

const petShowUseCase = new PetShowUseCase(petRepository);

const petListUseCase = new PetListUseCase(petRepository);

const petRemoveUseCase = new PetRemoveUseCase(petRepository);

const petEditUseCase = new PetEditUseCase(petRepository);

const petController = new PetController(
    petRegisterUseCase,
    petShowUseCase,
    petListUseCase,
    petRemoveUseCase,
    petEditUseCase,
    petMapper,
);

export { petController };