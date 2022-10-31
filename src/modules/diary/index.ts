import { DiaryController } from './diary.controller';
import { DiaryRegisterUseCase } from "./useCases/Register/DiaryRegisterUseCase";
import { DiaryMapper } from "./diary.mapper";
import { DiaryRepository } from "../../infra/sequelize/repositories/DiaryRepository";
import { PetDiaryRepository } from "../../infra/sequelize/repositories/PetDiaryRepository";
import DiarySequelizeModel from '../../infra/sequelize/models/Diary';
import PetDiarySequelizeModel from '../../infra/sequelize/models/PetDiary';
import AddressSequelizeModel from '../../infra/sequelize/models/Address';
import OwnerSequelizeModel from '../../infra/sequelize/models/Owner';
import { AddressRepository } from "../../infra/sequelize/repositories/AddressRepository";
import { DiaryListUseCase } from "./useCases/List/DiaryListUseCase";
import { DiaryShowUseCase } from "./useCases/Show/DiaryShowUseCase";
import { OwnerRepository } from "../../infra/sequelize/repositories/OwnerRepository";
import { OwnerMapper } from "../owner/owner.mapper";

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

const diaryRegisterUseCase = new DiaryRegisterUseCase(
    petDiaryRepository,
);

const diaryListUseCase = new DiaryListUseCase(
    petDiaryRepository
);

const diaryShowUseCase = new DiaryShowUseCase(
    ownerRepository,
    diaryRepository,
);

const diaryController = new DiaryController(
    diaryRegisterUseCase,
    diaryListUseCase,
    diaryShowUseCase,
    diaryMapper,
);

export { diaryController };