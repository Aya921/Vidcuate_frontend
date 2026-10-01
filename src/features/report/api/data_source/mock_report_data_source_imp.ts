import type { ApiResult } from "../../../../core/api/apiResult";
import { demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import type { ReportDataSource } from "../../data/data_source/report_data_source";
import type { VideoReportDto } from "../model/report_dto";

export class MockReportDataSourceImp implements ReportDataSource {
  async getVideoReport(videoId: number): Promise<ApiResult<VideoReportDto>> { await mockDelay(350); const video = demoStore.getVideo(videoId); if (!video) return { success: false, error: "Video not found" }; const topics = demoStore.segmentsFor(videoId).map((segment, index) => ({ id: String(segment.id), title: segment.title, quiz_score: index === 1 ? 65 : 88, mastery_level: index === 1 ? "developing" : "strong", correct_answers: index === 1 ? 2 : 4, quiz_total: 5, quiz_attempts: 1, weak_areas: index === 1 ? [segment.mainTopic] : [], materials_generated: { summary: true, study_notes: true, quiz: true, flashcards: 2 } })); return { success: true, data: { video_id: video.id, title: video.title, updated_at: "2026-09-21T10:30:00Z", overall_score_in_video: 79, correct_answers: 10, total_quiz_questions: 14, has_summary: true, has_study_notes: true, has_comprehensive_quiz: true, total_flashcards_generated: topics.length * 2, strong_topics: topics.filter((_, i) => i !== 1).map((topic) => topic.title), weak_topics: topics.filter((_, i) => i === 1).map((topic) => topic.title), topics } }; }
}
