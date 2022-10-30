import { DiaryController } from './diary.controller';
import { DiaryRegisterUseCase } from "./useCases/Register/DiaryRegisterUseCase";
import { DiaryMapper } from "./diary.mapper";
import { DiaryRepository } from "../../infra/sequelize/repositories/DiaryRepository";
import { PetDiaryRepository } from "../../infra/sequelize/repositories/PetDiaryRepository";
import DiarySequelizeModel from '../../infra/sequelize/models/Diary';
import PetDiarySequelizeModel from '../../infra/sequelize/models/PetDiary';

const diaryMapper = new DiaryMapper();

const diaryRepository = new DiaryRepository(
    DiarySequelizeModel,
    diaryMapper,
);

const petDiaryRepository = new PetDiaryRepository(
    PetDiarySequelizeModel,
    diaryRepository,
);

const diaryRegisterUseCase = new DiaryRegisterUseCase(
    petDiaryRepository,
);

const diaryController = new DiaryController(
    diaryRegisterUseCase,
    diaryMapper,
);

export { diaryController };