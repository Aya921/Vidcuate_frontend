import { QuizDataSourceImp } from "../../features/QuizSystem/api/data_source/quiz_data_source_imp";
import { QuizRepoImp } from "../../features/QuizSystem/data/repository/quiz_repo_imp";
import { GenerateQuizUseCase } from "../../features/QuizSystem/domain/usecase/generate_quiz_usecase";
import { MockQuizDataSourceImp } from "../../features/QuizSystem/api/data_source/mock_quiz_data_source_imp";
import { USE_MOCK_API } from "../mock/config";

const quizDataSource = USE_MOCK_API ? new MockQuizDataSourceImp() : new QuizDataSourceImp();
const quizRepo = new QuizRepoImp(quizDataSource);

export const generateQuizUseCase = new GenerateQuizUseCase(quizRepo);
