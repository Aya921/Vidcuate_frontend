import { ProfileDataSourceImp } from "../../features/Profile/api/data_source/profile_data_source_imp";
import { ProfileRepoImp } from "../../features/Profile/data/repository/profile_repo_imp";
import { deleteAccount } from "../../features/Profile/domain/usecase/delete_account";
import { GetUserData } from "../../features/Profile/domain/usecase/get_user_data";
import { UpdateLanguageUsecase } from "../../features/Profile/domain/usecase/update_language_usecase";
import { UpdateProfile } from "../../features/Profile/domain/usecase/update_profile_usecase";
import { MockProfileDataSourceImp } from "../../features/Profile/api/data_source/mock_profile_data_source_imp";
import { USE_MOCK_API } from "../mock/config";

const profileDataSource = USE_MOCK_API ? new MockProfileDataSourceImp() : new ProfileDataSourceImp();
const profileRepo = new ProfileRepoImp(profileDataSource);

export const updateLanguageUsecase = new UpdateLanguageUsecase(profileRepo);
export const getUserDataUsecase = GetUserData(profileRepo);
export const updateProfileUsecase = UpdateProfile(profileRepo);
export const deleteAccountUsecase = deleteAccount(profileRepo);
