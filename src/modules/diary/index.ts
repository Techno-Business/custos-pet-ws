import { DiaryController } from './diary.controller';
import { DiaryRegisterUseCase } from "./useCases/Register/DiaryRegisterUseCase";
import { DiaryMapper } from "./diary.mapper";
import { DiaryRepository } from "../../infra/sequelize/repositories/DiaryRepository";
import DiarySequelizeModel from '../../infra/sequelize/models/Diary';

const diaryMapper = new DiaryMapper();

const diaryRepository = new DiaryRepository(
    DiarySequelizeModel,
    diaryMapper,
);

const diaryRegisterUseCase = new DiaryRegisterUseCase(
    diaryRepository,
);

const diaryController = new DiaryController(
    diaryRegisterUseCase,
    diaryMapper,
);

export { diaryController };