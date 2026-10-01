import type { ApiResult } from "../../../../core/api/apiResult";
import { demoStore } from "../../../../core/mock/demo_store";
import { mockDelay } from "../../../../core/mock/config";
import { formatDuration } from "../../../../core/utils/fomat_time";
import type { QuizDataSource } from "../../data/data_source/quiz_data_source";
import type { QuizRequestDto, QuizSubmitRequestDto } from "../model/quiz_request_dto";
import type { QuizResponseDto, QuizSubmitResponseDto } from "../model/quiz_response_dto";

let nextQuizId = 9001;
const answers = new Map<number, QuizResponseDto>();
function makeQuiz(videoId: number, segmentId: number, difficulty: QuizRequestDto["difficulty"]): QuizResponseDto {
  const video = demoStore.getVideo(videoId)!; const id = nextQuizId++;
  const subjectSegment = demoStore.segmentsFor(videoId).find((segment) => segment.id === segmentId) ?? demoStore.segmentsFor(videoId)[0];
  const [firstTopic, secondTopic] = subjectSegment.subtopics;
  const distractors = demoStore.segmentsFor(videoId).filter((segment) => segment.id !== subjectSegment.id).map((segment) => segment.mainTopic);
  const firstTimestamp = firstTopic.start; const secondTimestamp = secondTopic.start;
  const questions = [{ question_id: id * 10 + 1, question_text: `Which idea is developed in "${subjectSegment.title}"?`, choices: { a: firstTopic.name, b: distractors[0], c: distractors[1], d: distractors[2] }, video_timestamp: firstTimestamp, timestamp_label: formatDuration(firstTimestamp), segment_id: subjectSegment.id, concept: subjectSegment.mainTopic }, { question_id: id * 10 + 2, question_text: `What else belongs with ${subjectSegment.mainTopic} in this section?`, choices: { a: distractors[0], b: secondTopic.name, c: distractors[1], d: distractors[3] ?? distractors[0] }, video_timestamp: secondTimestamp, timestamp_label: formatDuration(secondTimestamp), segment_id: subjectSegment.id, concept: secondTopic.name }];
  const quiz = { quiz_id: id, video_id: video.id, segment_id: segmentId, quiz_type: segmentId ? "segment" : "video", difficulty, language: "en", total_questions: questions.length, questions, created_at: "2026-09-21T10:00:00Z" }; answers.set(id, quiz); return quiz;
}
export class MockQuizDataSourceImp implements QuizDataSource {
  async generateVideoQuiz(videoId: number, body: QuizRequestDto): Promise<ApiResult<QuizResponseDto>> { await mockDelay(400); if (!demoStore.getVideo(videoId)) return { success: false, error: "Video not found" }; return { success: true, data: makeQuiz(videoId, 0, body.difficulty) }; }
  async generateSegmentQuiz(videoId: number, segmentId: number, body: QuizRequestDto): Promise<ApiResult<QuizResponseDto>> { await mockDelay(400); if (!demoStore.segmentsFor(videoId).some((segment) => segment.id === segmentId)) return { success: false, error: "Segment not found" }; return { success: true, data: makeQuiz(videoId, segmentId, body.difficulty) }; }
  async submitQuiz(quizId: number, body: QuizSubmitRequestDto): Promise<ApiResult<QuizSubmitResponseDto>> { await mockDelay(250); const quiz = answers.get(quizId); if (!quiz) return { success: false, error: "Quiz not found" }; const correct = ["a", "b"]; const questions = quiz.questions.map((question, index) => { const userAnswer = body.answers.find((answer) => answer.question_id === question.question_id)?.user_answer ?? ""; const correctAnswer = correct[index]; return { ...question, user_answer: userAnswer, correct_answer: correctAnswer, correct_answer_text: question.choices[correctAnswer], is_correct: userAnswer === correctAnswer, explanation: `Review ${question.concept} in "${demoStore.segmentsFor(quiz.video_id).find((segment) => segment.id === question.segment_id)?.title ?? demoStore.getTemplateForVideo(quiz.video_id).title}".` }; }); const correctCount = questions.filter((question) => question.is_correct).length; return { success: true, data: { quiz_id: quizId, correct_count: correctCount, wrong_count: questions.length - correctCount, total: questions.length, score: Math.round(correctCount / questions.length * 100), trials: 1, is_new: true, questions } }; }
}
