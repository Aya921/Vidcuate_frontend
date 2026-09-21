export const DEMO_USER_ID = 1;
export const DEMO_VIDEO_IDS = [101, 102, 103] as const;
export const DEMO_SEGMENT_IDS = [1001, 1002, 1003, 2001, 2002, 3001] as const;

export type DemoVideo = { id: number; templateId: string; title: string; thumbnail_url: string; url: string; duration: number; currentTime: number; type: "uploaded" | "linked" | "url"; subject: string; status: "completed" | "processing"; bookmarks: number[]; completedSegmentIds: number[] };
export type DemoSegment = { id: number; videoId: number; number: number; title: string; mainTopic: string; start: number; end: number; subtopics: { name: string; start: number }[] };
export type VideoTemplate = { id: string; title: string; subject: string; youtubeId: string; duration: number; segments: Omit<DemoSegment, "id" | "videoId">[]; takeaways: string[]; concepts: string[] };

const template = (id: string, title: string, subject: string, youtubeId: string, duration: number, topics: [string, string, string], concepts: string[]): VideoTemplate => ({
  id, title, subject, youtubeId, duration, concepts,
  takeaways: [`${topics[0]} establishes the foundation for ${subject}.`, `${topics[1]} connects theory with practical reasoning.`, `${topics[2]} helps students evaluate and apply the material.`],
  segments: topics.map((topic, index) => ({ number: index + 1, title: topic, mainTopic: concepts[index] ?? topic, start: Math.floor(duration / 3) * index, end: index === 2 ? duration : Math.floor(duration / 3) * (index + 1), subtopics: [{ name: concepts[index] ?? topic, start: Math.floor(duration / 3) * index + 45 }, { name: `${topic} in practice`, start: Math.floor(duration / 3) * index + 150 }] })),
});

/** Long-form public educational YouTube lectures/courses; thumbnails use YouTube's official hq image. */
export const videoTemplates: VideoTemplate[] = [
  template("neural-networks", "Introduction to Neural Networks", "Artificial Intelligence", "VMj-3S1tku0", 14400, ["Neurons, weights, and activation", "Backpropagation and optimization", "Generalization and evaluation"], ["Neuron model", "Gradient descent", "Overfitting"]),
  template("machine-learning", "Machine Learning Basics", "Machine Learning", "NWONeJKn6kc", 14400, ["Supervised learning foundations", "Features, models, and loss", "Validation and responsible use"], ["Training data", "Model evaluation", "Generalization"]),
  template("data-structures", "Data Structures & Algorithms", "Computer Science", "8hly31xKli0", 25080, ["Algorithmic thinking and complexity", "Arrays, lists, stacks, and queues", "Searching and sorting"], ["Big O notation", "Linear data structures", "Algorithm design"]),
  template("operating-systems", "Operating Systems Concepts", "Computer Science", "yK1uBHPdp30", 10800, ["Processes and threads", "Memory and virtual memory", "Files, scheduling, and synchronization"], ["Concurrency", "Memory management", "Scheduling"]),
  template("database-systems", "Database Systems Essentials", "Database Systems", "HXV3zeQKqGY", 14400, ["Relational data modeling", "SQL queries and joins", "Indexes, transactions, and integrity"], ["Normalization", "SQL", "Transactions"]),
  template("climate-change", "Climate Change Fundamentals", "Environmental Science", "G4H1N_yXBiA", 3600, ["Climate system and evidence", "Causes and observed impacts", "Mitigation and adaptation"], ["Greenhouse effect", "Climate evidence", "Climate action"]),
];
export const youtubeUrl = (youtubeId: string) => `https://www.youtube.com/watch?v=${youtubeId}`;
export const youtubeThumbnail = (youtubeId: string) => `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
export const getTemplate = (id: string) => videoTemplates.find((item) => item.id === id) ?? videoTemplates[0];
function cloneTemplate(templateId: string, id: number, segmentStartId: number, currentTime = 0): { video: DemoVideo; segments: DemoSegment[] } { const source = getTemplate(templateId); return { video: { id, templateId: source.id, title: source.title, thumbnail_url: youtubeThumbnail(source.youtubeId), url: youtubeUrl(source.youtubeId), duration: source.duration, currentTime, type: "url", subject: source.subject, status: "completed", bookmarks: [], completedSegmentIds: [] }, segments: source.segments.map((segment, index) => ({ ...segment, id: segmentStartId + index, videoId: id, subtopics: segment.subtopics.map((topic) => ({ ...topic })) })) }; }
const initial = [cloneTemplate("neural-networks", 101, 1001, 248), cloneTemplate("data-structures", 102, 2001, 124), cloneTemplate("climate-change", 103, 3001)];
export const demoSegments: DemoSegment[] = initial.flatMap((item) => item.segments);
type DemoState = { videos: DemoVideo[]; segments: DemoSegment[]; nextTemplateIndex: number; nextVideoId: number; nextSegmentId: number; profile: { first_name: string; last_name: string; email: string; study_field: string; language_preference: string; has_password: boolean }; preferences: Record<number, { summaryLang: "en" | "ar" | "Same as Video"; quizLang: "en" | "ar" | "Same as Video"; flashcardsLang: "en" | "ar" | "Same as Video" }> };
const storageKey = "viducate_mock_demo_state";
const initialState = (): DemoState => ({ videos: initial.map((item) => ({ ...item.video, bookmarks: [...item.video.bookmarks], completedSegmentIds: [...item.video.completedSegmentIds] })), segments: initial.flatMap((item) => item.segments), nextTemplateIndex: 0, nextVideoId: 104, nextSegmentId: 4001, profile: { first_name: "Maya", last_name: "Hassan", email: "demo@viducate.com", study_field: "Computer Science", language_preference: "en", has_password: true }, preferences: {} });
function load(): DemoState { try { const saved = localStorage.getItem(storageKey); const parsed = saved ? JSON.parse(saved) as Partial<DemoState> : null; return parsed?.segments && parsed.videos ? { ...initialState(), ...parsed } : initialState(); } catch { return initialState(); } }
let state = load();
function persist() { localStorage.setItem(storageKey, JSON.stringify(state)); }
export const demoStore = {
  get videos() { return state.videos; }, get profile() { return state.profile; }, getVideo(id: number) { return state.videos.find((video) => video.id === id); }, getTemplateForVideo(id: number) { const video = this.getVideo(id); return getTemplate(video?.templateId ?? "neural-networks"); }, segmentsFor(videoId: number) { return state.segments.filter((segment) => segment.videoId === videoId); },
  createFromNextTemplate() { const source = videoTemplates[state.nextTemplateIndex % videoTemplates.length]; state.nextTemplateIndex += 1; const clone = cloneTemplate(source.id, state.nextVideoId++, state.nextSegmentId); state.nextSegmentId += clone.segments.length; state.videos = [clone.video, ...state.videos]; state.segments = [...state.segments, ...clone.segments]; persist(); return clone.video; },
  deleteVideo(id: number) { state.videos = state.videos.filter((video) => video.id !== id); state.segments = state.segments.filter((segment) => segment.videoId !== id); persist(); },
  updateProgress(id: number, currentTime: number, bookmarks: number[], completedSegmentIds: number[]) { const video = this.getVideo(id); if (!video) return; Object.assign(video, { currentTime, bookmarks, completedSegmentIds }); persist(); }, updateProfile(profile: Partial<DemoState["profile"]>) { state.profile = { ...state.profile, ...profile }; persist(); }, getPreferences(videoId: number) { return state.preferences[videoId] ?? { summaryLang: "Same as Video", quizLang: "Same as Video", flashcardsLang: "Same as Video" } as const; }, savePreferences(videoId: number, preferences: DemoState["preferences"][number]) { state.preferences[videoId] = preferences; persist(); },
};
