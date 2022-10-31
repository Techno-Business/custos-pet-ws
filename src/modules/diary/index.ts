import { DiaryController } from './diary.controller';
import { DiaryRegisterUseCase } from "./useCases/Register/DiaryRegisterUseCase";
import { DiaryMapper } from "./diary.mapper";
import { DiaryRepository } from "../../infra/sequelize/repositories/DiaryRepository";
import { PetDiaryRepository } from "../../infra/sequelize/repositories/PetDiaryRepository";
import DiarySequelizeModel from '../../infra/sequelize/models/Diary';
import PetDiarySequelizeModel from '../../infra/sequelize/models/PetDiary';
import AddressSequelizeModel from '../../infra/sequelize/models/Address';
import { AddressRepository } from "../../infra/sequelize/repositories/AddressRepository";
import {DiaryListUseCase} from "./useCases/List/DiaryListUseCase";

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

const diaryRegisterUseCase = new DiaryRegisterUseCase(
    petDiaryRepository,
);

const diaryListUseCase = new DiaryListUseCase();

const diaryController = new DiaryController(
    diaryRegisterUseCase,
    diaryListUseCase,
    diaryMapper,
);

export { diaryController };