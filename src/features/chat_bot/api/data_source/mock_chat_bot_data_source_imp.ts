import type { ApiResult } from "../../../../core/api/apiResult";
import { demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import type { ChatBotDataSource } from "../../data/data_source/chat_bot_data_source";
import type { UserAsk } from "../../domain/entity/user_ask";
import type { ChatResponse } from "../../domain/entity/chat_response";
import type { SessionMessagesRequest } from "../../domain/entity/all_chat_messages_req";
import type { ChatMessage } from "../../domain/entity/chat_message";
import type { ChatSession } from "../../domain/entity/chat_session";
import type { DeleteMessageRequest } from "../../domain/entity/delete_message_req";

let nextSessionId = 501;
const sessions = new Map<number, ChatSession[]>();
const messages = new Map<string, ChatMessage[]>();
const key = (videoId: number, sessionId: number) => `${videoId}-${sessionId}`;
function videoSessions(videoId: number) { if (!sessions.has(videoId)) sessions.set(videoId, [{ id: 500, title: "Questions about neural networks", created_at: new Date("2026-09-20T14:00:00Z"), last_message_at: new Date("2026-09-21T10:00:00Z") }]); return sessions.get(videoId)!; }
function reply(question: string) { const lower = question.toLowerCase(); if (lower.includes("gradient")) return "Gradient descent updates each weight in the direction that reduces the loss. In this video, revisit the Training segment around 05:46."; if (lower.includes("bias")) return "The bias lets a neuron shift its activation threshold, so it is not forced to pass through the origin."; return "That idea relates to how the model learns from examples. Start with the neuron model, then connect loss, gradient descent, and validation."; }
export class MockChatBotDataSourceImp implements ChatBotDataSource {
  async getAllSessions(videoId: number): Promise<ApiResult<ChatSession[]>> { await mockDelay(); return { success: true, data: [...videoSessions(videoId)] }; }
  async getAllSessionMessages(req: SessionMessagesRequest): Promise<ApiResult<ChatMessage[]>> { await mockDelay(120); return { success: true, data: messages.get(key(req.video_id, req.session_id)) ?? [] }; }
  async getAnswer(req: UserAsk): Promise<ApiResult<ChatResponse>> { await mockDelay(300); if (!demoStore.getVideo(req.videoId)) return { success: false, error: "Video not found" }; let sessionId = req.session_id ?? null; if (!sessionId) { sessionId = nextSessionId++; videoSessions(req.videoId).unshift({ id: sessionId, title: req.question.slice(0, 42), created_at: new Date(), last_message_at: new Date() }); } const now = new Date().toISOString(); const list = messages.get(key(req.videoId, sessionId)) ?? []; list.push({ message_id: `u-${Date.now()}`, role: "user", content: req.question, time: req.currentTime, created_at: now }); const content = reply(req.question); list.push({ message_id: `a-${Date.now()}`, role: "assistant", content, time: req.currentTime, created_at: now }); messages.set(key(req.videoId, sessionId), list); const session = videoSessions(req.videoId).find((item) => item.id === sessionId)!; return { success: true, data: { session: { id: session.id, title: session.title }, message: { message_id: list[list.length - 1].message_id, content } } }; }
  async deleteSession(req: DeleteMessageRequest): Promise<ApiResult<void>> { await mockDelay(); sessions.set(req.video_id, videoSessions(req.video_id).filter((session) => session.id !== req.session_id)); messages.delete(key(req.video_id, req.session_id)); return { success: true, data: undefined }; }
}
