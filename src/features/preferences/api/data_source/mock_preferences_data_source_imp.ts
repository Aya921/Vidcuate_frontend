import type { ApiResult } from "../../../../core/api/apiResult";
import { demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import type { PreferencesDataSource } from "../../data/dataSource/preferences_dataSource";
import type { VideoPreferences } from "../../domain/entity/video_preferences";

export class MockPreferencesDataSourceImp implements PreferencesDataSource {
  async getPreferences(videoId: number): Promise<ApiResult<VideoPreferences>> { await mockDelay(150); return { success: true, data: { videoId, ...demoStore.getPreferences(videoId) } }; }
  async save(req: VideoPreferences): Promise<ApiResult<VideoPreferences>> { await mockDelay(180); demoStore.savePreferences(req.videoId, { summaryLang: req.summaryLang, quizLang: req.quizLang, flashcardsLang: req.flashcardsLang }); return { success: true, data: req }; }
}
