import { PetController } from "./pet.controller";
import { PetRegisterUseCase } from "./useCases/Register/PetRegisterUseCase";
import { PetRepository } from "../../infra/sequelize/repositories/PetRepository";
import PetSequelizeModel from '../../infra/sequelize/models/Pet'
import { PetMapper } from "./pet.mapper";

const petMapper = new PetMapper();

const petRepository = new PetRepository(PetSequelizeModel, petMapper);

const petRegisterUseCase = new PetRegisterUseCase(petRepository);

const petController = new PetController(petRegisterUseCase, petMapper);

export { petController };