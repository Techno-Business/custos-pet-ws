import { OwnerController } from './owner.controller';
import { OwnerSignUpUseCase } from './useCases/SignUp/OwnerSignUpUseCase';
import { OwnerRepository } from '../../infra/sequelize/repositories/OwnerRepository';
import { OwnerMapper } from './owner.mapper';
import OwnerSequelizeModel from '../../infra/sequelize/models/Owner'

const ownerMapper = new OwnerMapper();

const ownerRepository = new OwnerRepository(OwnerSequelizeModel, ownerMapper)

const ownerSignUpCase = new OwnerSignUpUseCase(ownerRepository)

const ownerController = new OwnerController(ownerSignUpCase, ownerMapper);

export { ownerController }