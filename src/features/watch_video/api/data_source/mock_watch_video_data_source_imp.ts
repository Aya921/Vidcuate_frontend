import type { ApiResult } from "../../../../core/api/apiResult";
import { demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import type { WatchVideoDataSource } from "../../data/data_source/watch_video_data_source";
import { VideoResponse } from "../../domin/entity/video_response";
import { TopicResponse } from "../../domin/entity/topic_response";
import { SubTopic } from "../../domin/entity/sub_topic";
import type { TopicsRequest } from "../../domin/entity/topics_request";
import type { SemanticSearchRequest } from "../../domin/entity/semantic_search_request";
import type { SemanticSearchResponse } from "../../domin/entity/semantic_search_response";
import type { SaveVideoReq } from "../../domin/entity/save_video_req";

export class MockWatchVideoDataSourceImp implements WatchVideoDataSource {
  async getTopics(req: TopicsRequest): Promise<ApiResult<VideoResponse>> {
    await mockDelay(); const video = demoStore.getVideo(req.videoId); if (!video) return { success: false, error: "Video not found" };
    return { success: true, data: new VideoResponse(video.url, video.id, video.title, video.currentTime, "2026-09-21T10:30:00Z", video.bookmarks, demoStore.segmentsFor(video.id).map((segment) => new TopicResponse(segment.id, segment.number, segment.start, segment.end, segment.mainTopic, segment.title, video.completedSegmentIds.includes(segment.id), segment.subtopics.map((topic) => new SubTopic(topic.name, topic.start))))) };
  }
  async getSearchResults(req: SemanticSearchRequest): Promise<ApiResult<SemanticSearchResponse[]>> {
    await mockDelay(); const query = req.query.toLowerCase();
    return { success: true, data: demoStore.segmentsFor(req.videoId).flatMap((segment) => segment.subtopics.filter((topic) => `${segment.title} ${segment.mainTopic} ${topic.name}`.toLowerCase().includes(query)).map((topic) => ({ video_id: segment.videoId, subtopic_id: segment.id * 10 + topic.start, title: segment.title, sub_topic_name: topic.name, sub_topic_description: `${topic.name} in ${segment.title}`, start_time: topic.start, score: 0.94 }))) };
  }
  async saveVideoProgress(req: SaveVideoReq): Promise<ApiResult<void>> { await mockDelay(100); if (!demoStore.getVideo(req.video_id)) return { success: false, error: "Video not found" }; demoStore.updateProgress(req.video_id, req.current_time, req.bookmarks, req.completed_segment_ids); return { success: true, data: undefined }; }
}
