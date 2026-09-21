import type { ApiResult } from "../../../../core/api/apiResult";
import { demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import type { DashboardDataSource } from "../../data/data_source/dashboard_data_source";
import type { DashboardEntity } from "../../domain/entity/dashboard";

export class MockDashboardDataSourceImp implements DashboardDataSource {
  async getDashboardData(): Promise<ApiResult<DashboardEntity>> {
    await mockDelay();
    const videos = demoStore.videos;
    return { success: true, data: {
      user: { name: `${demoStore.profile.first_name} ${demoStore.profile.last_name}` },
      stats: { total_videos_saved: videos.length, total_watch_time_seconds: videos.reduce((total, video) => total + video.currentTime, 0), total_storage: 5_368_709_120, used_storage: videos.length * 268_435_456, total_r2_storage: 5_368_709_120, used_r2_storage: videos.length * 268_435_456 },
      continue_learning: videos.map((video) => ({ videoId: video.id, title: video.title, thumbnail_url: video.thumbnail_url, duration: video.duration, currentTime: video.currentTime, remainingTime: video.duration - video.currentTime, progress: Math.round(video.currentTime / video.duration * 100), is_completed: video.currentTime >= video.duration, last_watched_at: "2026-09-21T10:30:00Z", created_at: "2026-09-15T09:00:00Z", video_type: video.type })),
    } };
  }
}
