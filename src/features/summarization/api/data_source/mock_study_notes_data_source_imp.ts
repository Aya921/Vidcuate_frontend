import type { ApiResult } from "../../../../core/api/apiResult";
import { demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import type { StudyNotesDataSource } from "../../data/dataSource/study_notes_data_source";
import type { SegmentStudyNotesResponseDto, VideoStudyNotesResponseDto } from "../model/study_notes_dto";

const notes = (title: string, videoId: number) => {
  const source = demoStore.getTemplateForVideo(videoId);
  const segment = demoStore.segmentsFor(videoId).find((item) => item.title === title);
  const topics = segment?.subtopics.map((topic) => topic.name) ?? source.concepts;
  return {
    title: `Study notes: ${title}`,
    introduction: segment
      ? `${segment.title} focuses on ${segment.mainTopic}.`
      : `${source.title} connects ${source.concepts.slice(0, 3).join(", ")}.`,
    sections: [{
      heading: segment?.mainTopic ?? topics[0],
      explanation: [
        { text: `${topics[0]} is developed in this part of the lecture.`, type: "important" as const },
        { text: topics[1] ?? topics[0], type: "term" as const, tooltip: segment ? `A topic inside ${segment.title}.` : `A central idea in ${source.title}.` },
      ],
      definitions: [{ term: segment?.mainTopic ?? topics[0], meaning: topics.slice(0, 3).join("; ") }],
      examples: [`Follow ${topics[1] ?? topics[0]} in the lecture before moving to the next section.`],
      notes: [topics[2] ?? topics[0]],
    }],
  };
};
export class MockStudyNotesDataSourceImp implements StudyNotesDataSource {
  async getVideoStudyNotes(videoId: number): Promise<ApiResult<VideoStudyNotesResponseDto>> { await mockDelay(350); const video = demoStore.getVideo(videoId); if (!video) return { success: false, error: "Video not found" }; return { success: true, data: { video_id: video.id, language: "en", cached: true, study_notes: notes(video.title, video.id), created_at: "2026-09-20T14:00:00Z", reading_time: { words: 180, minutes: 2, label: "2 min read" } } }; }
  async getSegmentStudyNotes(videoId: number, segmentId: number): Promise<ApiResult<SegmentStudyNotesResponseDto>> { await mockDelay(300); const segment = demoStore.segmentsFor(videoId).find((item) => item.id === segmentId); if (!segment) return { success: false, error: "Segment not found" }; return { success: true, data: { segment_id: segment.id, segment_number: segment.number, title: segment.title, start_time: segment.start, end_time: segment.end, language: "en", study_notes: notes(segment.title, videoId), generation_failed: false, reading_time: { words: 120, minutes: 1, label: "1 min read" } } }; }
}
