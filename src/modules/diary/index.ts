import { DiaryController } from './diary.controller';
import { DiaryRegisterUseCase } from "./useCases/Register/DiaryRegisterUseCase";

const diaryRegisterUseCase = new DiaryRegisterUseCase();

const diaryController = new DiaryController(diaryRegisterUseCase);

export { diaryController };