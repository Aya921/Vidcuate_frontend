import type { ApiResult } from "../../../../core/api/apiResult";
import { demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import { formatDuration } from "../../../../core/utils/fomat_time";
import type { FlashCardDataSoruce } from "../../data/data_soruce/flash_card_data_soruce";
import type { FlashCardDetials } from "../../domain/entity/flash_card_response";
import type { SegmentFlashCardRequest } from "../../domain/entity/segment_flash_card_request";

const cardsFor = (videoId: number): FlashCardDetials[] => demoStore.segmentsFor(videoId).flatMap((segment, index) => [{ flashcard_id: 7001 + index * 2, segment_id: segment.id, video_id: videoId, question: `What is the main idea of ${segment.title}?`, answer: `${segment.mainTopic}. This section also covers ${segment.subtopics.map((topic) => topic.name).join("; ")}.`, language: "en", difficulty: "medium" as const, created_at: "2026-09-20T14:00:00Z", segment_start_time: segment.start, segment_end_time: segment.end, segment_start_label: formatDuration(segment.start) }]);
export class MockFlashCardDataSourceImp implements FlashCardDataSoruce {
  async getVideoFlashCard(videoId: number): Promise<ApiResult<FlashCardDetials[]>> { await mockDelay(300); return demoStore.getVideo(videoId) ? { success: true, data: cardsFor(videoId) } : { success: false, error: "Video not found" }; }
  async getSegmentFlashCard(req: SegmentFlashCardRequest): Promise<ApiResult<FlashCardDetials[]>> { await mockDelay(250); return { success: true, data: cardsFor(req.videoId).filter((card) => card.segment_id === req.segmentId) }; }
}
