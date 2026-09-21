import type { ApiResult } from "../../../../core/api/apiResult";
import { DEMO_USER_ID, demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import type { ProfileDataSource } from "../../data/data_source/profile_data_source";
import type { UpdateRequest } from "../../domain/entity/update_req";
import type { UserProfileData } from "../../domain/entity/update_user_data";

const profile = (): UserProfileData => ({ id: DEMO_USER_ID, ...demoStore.profile });
export class MockProfileDataSourceImp implements ProfileDataSource {
  async getUserProfile(): Promise<ApiResult<UserProfileData>> { await mockDelay(); return { success: true, data: profile() }; }
  async updateProfile(req: UpdateRequest): Promise<ApiResult<UserProfileData>> { await mockDelay(); demoStore.updateProfile({ first_name: req.first_name, last_name: req.last_name }); return { success: true, data: profile() }; }
  async updateLanguage(language: string): Promise<ApiResult<void>> { await mockDelay(); demoStore.updateProfile({ language_preference: language }); return { success: true, data: undefined }; }
  async deleteAccount(): Promise<ApiResult<string>> { await mockDelay(); return { success: true, data: "Demo account deletion simulated" }; }
}
