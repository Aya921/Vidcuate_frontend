import { SummaryDataSourceImp } from "../../features/summarization/api/data_source/summary_data_source_imp";
import { SummaryRepoImp } from "../../features/summarization/data/repository/summary_repo_imp";
import { GetVideoSummaryUsecase } from "../../features/summarization/domain/usecase/get_video_summary_usecase";
import { GetSegmentSummaryUsecase } from "../../features/summarization/domain/usecase/get_segment_summary_usecase";
import { StudyNotesDataSourceImp } from "../../features/summarization/api/data_source/study_notes_data_source_imp";
import { StudyNotesRepoImp } from "../../features/summarization/data/repository/study_notes_repo_imp";
import { GetSegmentStudyNotesUsecase } from "../../features/summarization/domain/usecase/get_segment_study_notes_usecase";
import { GetVideoStudyNotesUsecase } from "../../features/summarization/domain/usecase/get_video_study_notes_usecase";
import { ExportDataSourceImp } from "../../features/summarization/api/data_source/export_data_source_imp";
import { ExportRepoImp } from "../../features/summarization/data/repository/export_repo_imp";
import { ExportUsecase } from "../../features/summarization/domain/usecase/export_usecase";
import { MockSummaryDataSourceImp } from "../../features/summarization/api/data_source/mock_summary_data_source_imp";
import { MockStudyNotesDataSourceImp } from "../../features/summarization/api/data_source/mock_study_notes_data_source_imp";
import { USE_MOCK_API } from "../mock/config";
import { MockExportDataSourceImp } from "../../features/summarization/api/data_source/mock_export_data_source_imp";

const dataSource = USE_MOCK_API ? new MockSummaryDataSourceImp() : new SummaryDataSourceImp();
const repo = new SummaryRepoImp(dataSource);
const studyNotesDataSource = USE_MOCK_API ? new MockStudyNotesDataSourceImp() : new StudyNotesDataSourceImp();
const studyNotesRepo = new StudyNotesRepoImp(studyNotesDataSource);
const exportDataSource = USE_MOCK_API ? new MockExportDataSourceImp() : new ExportDataSourceImp();
const exportRepo = new ExportRepoImp(exportDataSource);
export const exportUsecase = new ExportUsecase(exportRepo);
export const getSegmentStudyNotesUsecase = new GetSegmentStudyNotesUsecase(
  studyNotesRepo,
);
export const getVideoSummaryUsecase = new GetVideoSummaryUsecase(repo);
export const getSegmentSummaryUsecase = new GetSegmentSummaryUsecase(repo);
export const getVideoStudyNotesUsecase = new GetVideoStudyNotesUsecase(
  studyNotesRepo,
);
