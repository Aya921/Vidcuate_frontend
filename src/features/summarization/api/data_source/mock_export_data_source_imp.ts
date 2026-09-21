import type { ApiResult } from "../../../../core/api/apiResult";
import { mockDelay } from "../../../../core/mock/config";
import type { ExportDataSource } from "../../data/dataSource/export_data_source";
const file = (kind: string, videoId: number, segmentId?: number) => new Blob([`${kind} for demo video ${videoId}${segmentId ? `, segment ${segmentId}` : ""}`], { type: "text/plain" });
export class MockExportDataSourceImp implements ExportDataSource {
  async downloadVideoSummary(videoId: number): Promise<ApiResult<Blob>> { await mockDelay(); return { success: true, data: file("Summary", videoId) }; }
  async downloadSegmentSummary(videoId: number, segmentId: number): Promise<ApiResult<Blob>> { await mockDelay(); return { success: true, data: file("Summary", videoId, segmentId) }; }
  async downloadVideoStudyNotes(videoId: number): Promise<ApiResult<Blob>> { await mockDelay(); return { success: true, data: file("Study notes", videoId) }; }
  async downloadSegmentStudyNotes(videoId: number, segmentId: number): Promise<ApiResult<Blob>> { await mockDelay(); return { success: true, data: file("Study notes", videoId, segmentId) }; }
}
