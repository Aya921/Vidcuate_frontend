import type { ApiResult } from "../../../../core/api/apiResult";
import { demoStore, DEMO_USER_ID } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import type { AuthDataSource } from "../../data/data_source/auth_data_source";
import type { ForgetPassReq } from "../../domain/entity/forgetpass_request";
import type { ResetPasswordRequest } from "../../domain/entity/reset_password_request";
import type { User } from "../../domain/entity/user";
import type { LoginRequestDto } from "../models/login/login_request_dto";
import type { LoginResponseDto } from "../models/login/login_response_dto";
import type { SignupRequestDto } from "../models/signup/signup_request_dto";
import type { SignupResponseDto } from "../models/signup/signup_response_dto";

const user = (): User => ({ id: DEMO_USER_ID, ...demoStore.profile });
const token = "viducate-demo-token";

export class MockAuthDataSourceImp implements AuthDataSource {
  async login(data: LoginRequestDto): Promise<ApiResult<LoginResponseDto>> {
    await mockDelay();
    if (data.email !== demoStore.profile.email || data.password !== "password123") return { success: false, error: "Invalid email or password" };
    return { success: true, data: { access_token: token, token_type: "bearer", user: { name: `${demoStore.profile.first_name} ${demoStore.profile.last_name}`, ...user() } } };
  }
  async register(data: SignupRequestDto): Promise<ApiResult<SignupResponseDto>> {
    await mockDelay();
    demoStore.updateProfile({ first_name: data.first_name, last_name: data.last_name, email: data.email });
    const runtimeUser = { name: `${data.first_name} ${data.last_name}`, ...user() };
    return { success: true, data: { message: "Account created", user: runtimeUser, token: { access_token: token, token_type: "bearer", user: runtimeUser } } };
  }
  async getCurrentUser(): Promise<ApiResult<User>> { await mockDelay(100); return { success: true, data: user() }; }
  async forgetPassword(_req: ForgetPassReq): Promise<ApiResult<string>> { await mockDelay(); return { success: true, data: "A reset link was sent to your email." }; }
  async resetPassword(_req: ResetPasswordRequest): Promise<ApiResult<string>> { await mockDelay(); return { success: true, data: "Your password has been reset." }; }
}
