import type { ApiResult } from "../../../../core/api/apiResult";
import { demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import type { MindMapDataSource } from "../../data/data_source/mind_map_data_source";
import type { MindMapEntity } from "../../domain/entity/maind_map_entity";
import type { MindMapReq } from "../../domain/entity/maind_map_req";

export class MockMindMapDataSourceImp implements MindMapDataSource {
  async getMindMapDetails(req: MindMapReq): Promise<ApiResult<MindMapEntity>> { await mockDelay(350); const video = demoStore.getVideo(req.videoid); if (!video) return { success: false, error: "Video not found" }; const segments = demoStore.segmentsFor(video.id); return { success: true, data: { videoId: video.id, title: video.title, language: "en", cached: true, createdAt: new Date("2026-09-20T14:00:00Z"), nodes: [{ id: "root", label: video.title, type: "root" }, ...segments.map((segment) => ({ id: String(segment.id), label: segment.title, type: "segment" as const }))], edges: segments.map((segment) => ({ id: `root-${segment.id}`, source: "root", target: String(segment.id) })) } }; }
}
