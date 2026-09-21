import type { ApiResult } from "../../../../core/api/apiResult";
import { demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import type { QuizDataSource } from "../../data/data_source/quiz_data_source";
import type { QuizRequestDto, QuizSubmitRequestDto } from "../model/quiz_request_dto";
import type { QuizResponseDto, QuizSubmitResponseDto } from "../model/quiz_response_dto";

let nextQuizId = 9001;
const answers = new Map<number, QuizResponseDto>();
function makeQuiz(videoId: number, segmentId: number, difficulty: QuizRequestDto["difficulty"]): QuizResponseDto {
  const video = demoStore.getVideo(videoId)!; const id = nextQuizId++;
  const questions = [{ question_id: id * 10 + 1, question_text: "What does the bias term allow a neuron to do?", choices: { a: "Shift the activation threshold", b: "Remove all weights", c: "Store video frames", d: "Replace the loss function" }, video_timestamp: 88, timestamp_label: "01:28", segment_id: segmentId, concept: "Bias" }, { question_id: id * 10 + 2, question_text: "Which method updates parameters to reduce loss?", choices: { a: "Random sampling", b: "Gradient descent", c: "Video buffering", d: "Data deletion" }, video_timestamp: 346, timestamp_label: "05:46", segment_id: segmentId, concept: "Optimization" }];
  const quiz = { quiz_id: id, video_id: video.id, segment_id: segmentId, quiz_type: segmentId ? "segment" : "video", difficulty, language: "en", total_questions: questions.length, questions, created_at: "2026-09-21T10:00:00Z" }; answers.set(id, quiz); return quiz;
}
export class MockQuizDataSourceImp implements QuizDataSource {
  async generateVideoQuiz(videoId: number, body: QuizRequestDto): Promise<ApiResult<QuizResponseDto>> { await mockDelay(400); if (!demoStore.getVideo(videoId)) return { success: false, error: "Video not found" }; return { success: true, data: makeQuiz(videoId, 0, body.difficulty) }; }
  async generateSegmentQuiz(videoId: number, segmentId: number, body: QuizRequestDto): Promise<ApiResult<QuizResponseDto>> { await mockDelay(400); if (!demoStore.segmentsFor(videoId).some((segment) => segment.id === segmentId)) return { success: false, error: "Segment not found" }; return { success: true, data: makeQuiz(videoId, segmentId, body.difficulty) }; }
  async submitQuiz(quizId: number, body: QuizSubmitRequestDto): Promise<ApiResult<QuizSubmitResponseDto>> { await mockDelay(250); const quiz = answers.get(quizId); if (!quiz) return { success: false, error: "Quiz not found" }; const correct = ["a", "b"]; const questions = quiz.questions.map((question, index) => { const userAnswer = body.answers.find((answer) => answer.question_id === question.question_id)?.user_answer ?? ""; const correctAnswer = correct[index]; return { ...question, user_answer: userAnswer, correct_answer: correctAnswer, correct_answer_text: question.choices[correctAnswer], is_correct: userAnswer === correctAnswer, explanation: index === 0 ? "Bias shifts the activation threshold." : "Gradient descent follows the loss gradient downward." }; }); const correctCount = questions.filter((question) => question.is_correct).length; return { success: true, data: { quiz_id: quizId, correct_count: correctCount, wrong_count: questions.length - correctCount, total: questions.length, score: Math.round(correctCount / questions.length * 100), trials: 1, is_new: true, questions } }; }
}
