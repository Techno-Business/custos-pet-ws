import { DiaryController } from './diary.controller';
import { DiaryRegisterUseCase } from "./useCases/Register/DiaryRegisterUseCase";
import {DiaryMapper} from "./diary.mapper";

const diaryMapper = new DiaryMapper();

const diaryRegisterUseCase = new DiaryRegisterUseCase();

const diaryController = new DiaryController(
    diaryRegisterUseCase,
    diaryMapper,
);

export { diaryController };