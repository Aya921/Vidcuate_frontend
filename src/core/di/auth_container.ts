import { AuthApiService } from "../../features/auth/api/client/auth_service";
import { AuthDataSourceImp } from "../../features/auth/api/data_source/auth_data_source_imp";
import { AuthRepoImp } from "../../features/auth/data/repo/auth_repo_imp";
import { ForgetPassUseCase } from "../../features/auth/domain/usecase/forgetpass_usecase";
import { LoginUseCase } from "../../features/auth/domain/usecase/login";
import { ResetPasswordUsecase } from "../../features/auth/domain/usecase/reset_pass_usecase";
import { SignupUseCase } from "../../features/auth/domain/usecase/signup";
import { GetCurrentUserUseCase } from "../../features/auth/domain/usecase/get_currecnt_user";
import { MockAuthDataSourceImp } from "../../features/auth/api/data_source/mock_auth_data_source_imp";
import { USE_MOCK_API } from "../mock/config";

const apiService = new AuthApiService();
const dataSource = USE_MOCK_API ? new MockAuthDataSourceImp() : new AuthDataSourceImp(apiService);
const repository = new AuthRepoImp(dataSource);

export const forgetPassUseCase = new ForgetPassUseCase(repository);
export const resetPassUseCase = new ResetPasswordUsecase(repository);
export const signupUseCase = new SignupUseCase(repository);
export const loginUseCase = new LoginUseCase(repository);
export const getCurrentUserUseCase = new GetCurrentUserUseCase(repository);


