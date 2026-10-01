import type { ApiResult } from "../../../../core/api/apiResult";
import { demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import type { SummaryDataSource } from "../../data/dataSource/summary_data_source";
import type { SegmentSummaryResponseDto, VideoSummaryResponseDto } from "../model/summary_dto";

const summary = (title: string, videoId: number) => {
  const source = demoStore.getTemplateForVideo(videoId);
  const segment = demoStore.segmentsFor(videoId).find((item) => item.title === title);
  const focus = segment?.subtopics.map((topic) => topic.name) ?? source.concepts;
  return {
    takeaways: segment ? focus.map((topic) => `${topic} is part of ${segment.title}.`) : source.takeaways,
    sections: [{ heading: segment?.mainTopic ?? source.subject, content: [{ text: segment ? `${segment.title} develops ${segment.mainTopic} through ${focus.join(", ")}.` : `${source.title} develops ${source.concepts.join(", ")}.`, type: "normal" as const }, { text: focus[0], type: "term" as const, tooltip: segment ? `Discussed in ${segment.title}.` : `A central idea in ${source.title}.` }] }],
    conclusion: segment ? `${segment.title} covers ${focus.join(", ")}.` : source.takeaways[source.takeaways.length - 1],
  };
};
export class MockSummaryDataSourceImp implements SummaryDataSource {
  async getVideoSummary(videoId: number): Promise<ApiResult<VideoSummaryResponseDto>> { await mockDelay(350); const video = demoStore.getVideo(videoId); if (!video) return { success: false, error: "Video not found" }; return { success: true, data: { video_id: video.id, title: video.title, summary: summary(video.title, video.id), language: "en", created_at: "2026-09-20T14:00:00Z", cached: true, reading_time: { words: 142, minutes: 1, label: "1 min read" } } }; }
  async getSegmentSummary(videoId: number, segmentId: number): Promise<ApiResult<SegmentSummaryResponseDto>> { await mockDelay(300); const segment = demoStore.segmentsFor(videoId).find((item) => item.id === segmentId); if (!segment) return { success: false, error: "Segment not found" }; return { success: true, data: { segment_id: segment.id, segment_number: segment.number, title: segment.title, start_time: segment.start, end_time: segment.end, summary: summary(segment.title, videoId), language: "en", generation_failed: false, reading_time: { words: 96, minutes: 1, label: "1 min read" } } }; }
}
