import { VideoStatusService } from "../../features/video_upload/api/client/video_status_service";
import { VideoStatusDataSourceImp } from "../../features/video_upload/api/data_source/video_status_dataSource_imp";
import { VideoStatusRepoImp } from "../../features/video_upload/data/repository/video_status_repo_imp";
import { GetVideoStatusUseCase } from "../../features/video_upload/domain/usecase/get_video_status_usecase";
import { CancelAnalysisUsecase } from "../../features/video_upload/domain/usecase/cancel_analysis_usecase";
import { MockVideoStatusDataSourceImp } from "../../features/video_upload/api/data_source/mock_video_status_data_source_imp";
import { USE_MOCK_API } from "../mock/config";

const videoStatusService = new VideoStatusService();
const videoStatusDataSource = USE_MOCK_API ? new MockVideoStatusDataSourceImp() : new VideoStatusDataSourceImp(videoStatusService);
const videoStatusRepo = new VideoStatusRepoImp(videoStatusDataSource);

export const getVideoStatusUseCase = new GetVideoStatusUseCase(videoStatusRepo);
export const cancelAnalysisUsecase = new CancelAnalysisUsecase(videoStatusRepo);
