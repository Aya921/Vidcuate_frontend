import type { ApiResult } from "../../../../core/api/apiResult";
import { demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import type { SummaryDataSource } from "../../data/dataSource/summary_data_source";
import type { SegmentSummaryResponseDto, VideoSummaryResponseDto } from "../model/summary_dto";

const summary = (title: string, videoId: number) => { const source = demoStore.getTemplateForVideo(videoId); return { takeaways: source.takeaways, sections: [{ heading: "Core ideas", content: [{ text: `${title} explains the central concepts of ${source.subject} through a connected lecture sequence.`, type: "normal" as const }, { text: source.concepts[0], type: "term" as const, tooltip: `A key concept in this ${source.subject} template.` }] }], conclusion: `${title} links ${source.concepts.join(", ")} to practical study and evaluation.` }; };
export class MockSummaryDataSourceImp implements SummaryDataSource {
  async getVideoSummary(videoId: number): Promise<ApiResult<VideoSummaryResponseDto>> { await mockDelay(350); const video = demoStore.getVideo(videoId); if (!video) return { success: false, error: "Video not found" }; return { success: true, data: { video_id: video.id, title: video.title, summary: summary(video.title, video.id), language: "en", created_at: "2026-09-20T14:00:00Z", cached: true, reading_time: { words: 142, minutes: 1, label: "1 min read" } } }; }
  async getSegmentSummary(videoId: number, segmentId: number): Promise<ApiResult<SegmentSummaryResponseDto>> { await mockDelay(300); const segment = demoStore.segmentsFor(videoId).find((item) => item.id === segmentId); if (!segment) return { success: false, error: "Segment not found" }; return { success: true, data: { segment_id: segment.id, segment_number: segment.number, title: segment.title, start_time: segment.start, end_time: segment.end, summary: summary(segment.title, videoId), language: "en", generation_failed: false, reading_time: { words: 96, minutes: 1, label: "1 min read" } } }; }
}
