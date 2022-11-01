import { DiaryController } from './diary.controller';
import { DiaryRegisterUseCase } from "./useCases/Register/DiaryRegisterUseCase";
import { DiaryMapper } from "./diary.mapper";
import { DiaryRepository } from "../../infra/sequelize/repositories/DiaryRepository";
import { PetDiaryRepository } from "../../infra/sequelize/repositories/PetDiaryRepository";
import DiarySequelizeModel from '../../infra/sequelize/models/Diary';
import PetDiarySequelizeModel from '../../infra/sequelize/models/PetDiary';
import AddressSequelizeModel from '../../infra/sequelize/models/Address';
import OwnerSequelizeModel from '../../infra/sequelize/models/Owner';
import PetSequelizeModel from '../../infra/sequelize/models/Pet';
import { AddressRepository } from "../../infra/sequelize/repositories/AddressRepository";
import { DiaryListUseCase } from "./useCases/List/DiaryListUseCase";
import { DiaryShowUseCase } from "./useCases/Show/DiaryShowUseCase";
import { OwnerRepository } from "../../infra/sequelize/repositories/OwnerRepository";
import { OwnerMapper } from "../owner/owner.mapper";
import { PetRepository } from "../../infra/sequelize/repositories/PetRepository";
import { PetMapper } from "../pet/pet.mapper";
import {DiaryUpdateUseCase} from "./useCases/Update/DiaryUpdateUseCase";

const diaryMapper = new DiaryMapper();

const diaryRepository = new DiaryRepository(
    DiarySequelizeModel,
    diaryMapper,
);

const addressRepository = new AddressRepository(
    AddressSequelizeModel,
);

const petDiaryRepository = new PetDiaryRepository(
    PetDiarySequelizeModel,
    diaryRepository,
    addressRepository,
);

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

const diaryRegisterUseCase = new DiaryRegisterUseCase(
    ownerRepository,
    petRepository,
    petDiaryRepository,
);

const diaryListUseCase = new DiaryListUseCase(
    ownerRepository,
    petRepository,
    petDiaryRepository,
);

const diaryShowUseCase = new DiaryShowUseCase(
    ownerRepository,
    diaryRepository,
);

const diaryUpdateUseCase = new DiaryUpdateUseCase();

const diaryController = new DiaryController(
    diaryRegisterUseCase,
    diaryListUseCase,
    diaryShowUseCase,
    diaryUpdateUseCase,
    diaryMapper,
);

export { diaryController };