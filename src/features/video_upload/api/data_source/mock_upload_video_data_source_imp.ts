import type { ApiResult } from "../../../../core/api/apiResult";
import { demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import type { UploadVideoDataSource } from "../../data/dataSource/upload_video_dataSource";
import { ConfirmUploadResponse } from "../../domain/entity/confirm_upload_response";
import type { UploadVideoRequest } from "../../domain/entity/upload_video_request";
import { UrlResponse } from "../../domain/entity/url_response";
import type { UrlRequest } from "../../domain/entity/url_request";

export class MockUploadVideoDataSourceImp implements UploadVideoDataSource {
  async uploadVideo(_req: UploadVideoRequest, onProgress?: (percent: number) => void, signal?: AbortSignal, onVideoIdReceived?: (id: number) => void): Promise<ApiResult<ConfirmUploadResponse>> {
    void _req;
    const video = demoStore.createFromNextTemplate();
    onVideoIdReceived?.(video.id);
    for (const progress of [10, 35, 65, 100]) { if (signal?.aborted) return { success: true, data: { videoId: video.id, title: video.title, message: "Upload cancelled", processing_status: "cancelled" } }; onProgress?.(progress); await mockDelay(120); }
    return { success: true, data: { videoId: video.id, title: video.title, message: "Upload complete; educational template analysis started", processing_status: "processing" } };
  }
  async uploadURL(req: UrlRequest): Promise<ApiResult<UrlResponse>> {
    await mockDelay(400); const video = demoStore.createFromNextTemplate();
    return { success: true, data: new UrlResponse(video.id, video.title, video.url, req.language, "processing", "Educational video template added; analysis started") };
  }
  async deleteVideo(videoId: number): Promise<ApiResult<string>> { await mockDelay(); if (!demoStore.getVideo(videoId)) return { success: false, error: "Video not found" }; demoStore.deleteVideo(videoId); return { success: true, data: "Video deleted successfully" }; }
}
