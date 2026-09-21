import { DashboardService } from "../../features/dashboard/api/client/dashboard_service";
import { DashboardDataSourceImp } from "../../features/dashboard/api/data_source/dashboard_data_source_imp";
import { DashboardRepoImp } from "../../features/dashboard/data/respository/dashboard_repo_imp";
import { GetDashboardData } from "../../features/dashboard/domain/usecase/get_sessions";
import { MockDashboardDataSourceImp } from "../../features/dashboard/api/data_source/mock_dashboard_data_source_imp";
import { USE_MOCK_API } from "../mock/config";

const dashboardService = new DashboardService();
const dataSource = USE_MOCK_API ? new MockDashboardDataSourceImp() : new DashboardDataSourceImp(dashboardService);
const repository = new DashboardRepoImp(dataSource);

export const getDashboardData = GetDashboardData(repository);
