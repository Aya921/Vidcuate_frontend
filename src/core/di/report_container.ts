import { ReportDataSourceImp } from "../../features/report/api/data_source/report_data_source_imp";
import { ReportRepoImp } from "../../features/report/data/repository/report_repo_imp";
import { GetVideoReportUsecase } from "../../features/report/domain/usecase/get_video_report_usecase";
import { MockReportDataSourceImp } from "../../features/report/api/data_source/mock_report_data_source_imp";
import { USE_MOCK_API } from "../mock/config";

const reportDataSource = USE_MOCK_API ? new MockReportDataSourceImp() : new ReportDataSourceImp();
const reportRepo = new ReportRepoImp(reportDataSource);

export const getVideoReportUsecase = new GetVideoReportUsecase(reportRepo);
