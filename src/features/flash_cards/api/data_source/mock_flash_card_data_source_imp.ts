import type { ApiResult } from "../../../../core/api/apiResult";
import { demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import type { FlashCardDataSoruce } from "../../data/data_soruce/flash_card_data_soruce";
import type { FlashCardDetials } from "../../domain/entity/flash_card_response";
import type { SegmentFlashCardRequest } from "../../domain/entity/segment_flash_card_request";

const cardsFor = (videoId: number): FlashCardDetials[] => demoStore.segmentsFor(videoId).flatMap((segment, index) => [{ flashcard_id: 7001 + index * 2, segment_id: segment.id, video_id: videoId, question: `What is the main idea of ${segment.title}?`, answer: `${segment.mainTopic} is explained through a concrete learning example.`, language: "en", difficulty: "medium" as const, created_at: "2026-09-20T14:00:00Z", segment_start_time: segment.start, segment_end_time: segment.end, segment_start_label: `${Math.floor(segment.start / 60)}:${String(segment.start % 60).padStart(2, "0")}` }]);
export class MockFlashCardDataSourceImp implements FlashCardDataSoruce {
  async getVideoFlashCard(videoId: number): Promise<ApiResult<FlashCardDetials[]>> { await mockDelay(300); return demoStore.getVideo(videoId) ? { success: true, data: cardsFor(videoId) } : { success: false, error: "Video not found" }; }
  async getSegmentFlashCard(req: SegmentFlashCardRequest): Promise<ApiResult<FlashCardDetials[]>> { await mockDelay(250); return { success: true, data: cardsFor(req.videoId).filter((card) => card.segment_id === req.segmentId) }; }
}
