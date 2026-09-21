import { demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import type { ApiResult } from "../../../../core/api/apiResult";
import type { VideoStatusResponseDto } from "../model/video_status_response_dto";
import type { VideoStatusDataSource } from "../../data/dataSource/video_status_dataSource";

export class MockVideoStatusDataSourceImp implements VideoStatusDataSource {
  async getVideoStatus(videoId: number): Promise<VideoStatusResponseDto> {
    await mockDelay(100); const video = demoStore.getVideo(videoId); if (!video) throw new Error("Video not found");
    if (video.status === "processing") video.status = "completed";
    return { video_id: video.id, title: video.title, processing_status: video.status, upload_date: "2026-09-21T10:00:00Z", created_at: "2026-09-21T10:00:00Z" };
  }
  async cancelAnalysis(videoId: number): Promise<ApiResult<void>> { await mockDelay(); if (!demoStore.getVideo(videoId)) return { success: false, error: "Video not found" }; return { success: true, data: undefined }; }
}
