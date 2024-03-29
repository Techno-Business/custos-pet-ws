import { OwnerMapper } from './owner.mapper';
import OwnerSequelizeModel from '../../infra/sequelize/models/Owner'
import { OwnerRepository } from '../../infra/sequelize/repositories/OwnerRepository';
import { OwnerSignUpUseCase } from './useCases/SignUp/OwnerSignUpUseCase';
import { OwnerSignInUseCase } from "./useCases/SignIn/OwnerSignInUseCase";
import { OwnerController } from './owner.controller';

const ownerMapper = new OwnerMapper();

const ownerRepository = new OwnerRepository(OwnerSequelizeModel, ownerMapper)

const ownerSignUpUseCase = new OwnerSignUpUseCase(ownerRepository)

const ownerSignInUseCase = new OwnerSignInUseCase(ownerRepository);

const ownerController = new OwnerController(
    ownerSignUpUseCase,
    ownerSignInUseCase,
    ownerMapper
);

export { ownerController }