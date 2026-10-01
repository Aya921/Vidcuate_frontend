export const DEMO_USER_ID = 1;
export const DEMO_VIDEO_IDS = [101, 102, 103] as const;
export const DEMO_SEGMENT_IDS = [1001, 1002, 1003, 2001, 2002, 3001] as const;

export type DemoVideo = {
  id: number;
  templateId: string;
  title: string;
  thumbnail_url: string;
  url: string;
  duration: number;
  currentTime: number;
  type: "uploaded" | "linked" | "url";
  subject: string;
  status: "completed" | "processing";
  bookmarks: number[];
  completedSegmentIds: number[];
};
export type DemoSegment = {
  id: number;
  videoId: number;
  number: number;
  title: string;
  mainTopic: string;
  start: number;
  end: number;
  subtopics: { name: string; start: number }[];
};
export type VideoTemplate = {
  id: string;
  title: string;
  subject: string;
  youtubeId: string;
  duration: number;
  segments: Omit<DemoSegment, "id" | "videoId">[];
  takeaways: string[];
  concepts: string[];
};

const hms = (hours: number, minutes: number, seconds = 0) =>
  hours * 3600 + minutes * 60 + seconds;

type LectureSegment = Omit<DemoSegment, "id" | "videoId" | "number">;

const lecture = (
  id: string,
  title: string,
  subject: string,
  youtubeId: string,
  duration: number,
  segments: LectureSegment[],
  concepts: string[],
  takeaways: string[],
): VideoTemplate => ({
  id,
  title,
  subject,
  youtubeId,
  duration,
  concepts,
  takeaways,
  segments: segments.map((segment, index) => ({
    number: index + 1,
    ...segment,
  })),
});

/**
 * Public educational YouTube lectures. `duration` is the published length in
 * seconds. Segment boundaries follow each video's own chapters or the point
 * in the lecture where that topic begins, and they meet at the final second.
 */
export const videoTemplates: VideoTemplate[] = [
  lecture(
    "neural-networks",
    "Coordination Compounds | Class 12 Chemistry | Quick Revision",
    "Chemistry",
    "6B35tYDu_V8",
    2230,
    [
      {
        title: "Coordination compounds and Werner's theory",
        mainTopic: "Werner's theory",
        start: 0,
        end: hms(0, 3, 25),
        subtopics: [
          { name: "Coordination compounds", start: hms(0, 0, 12) },
          { name: "Werner's theory", start: hms(0, 1, 12) },
        ],
      },
      {
        title: "Ligands, coordination number, and oxidation state",
        mainTopic: "Ligands",
        start: hms(0, 3, 25),
        end: hms(0, 11, 29),
        subtopics: [
          { name: "Double salts and complex salts", start: hms(0, 3, 25) },
          { name: "The coordination entity and central atom", start: hms(0, 4, 39) },
          { name: "Ligands", start: hms(0, 5, 34) },
          { name: "Coordination number", start: hms(0, 8, 45) },
          { name: "Coordination sphere and polyhedron", start: hms(0, 9, 36) },
          { name: "Oxidation number", start: hms(0, 10, 48) },
        ],
      },
      {
        title: "Naming coordination compounds and isomerism",
        mainTopic: "Nomenclature",
        start: hms(0, 11, 29),
        end: hms(0, 23, 10),
        subtopics: [
          { name: "Types of complexes", start: hms(0, 11, 29) },
          { name: "Naming coordination compounds", start: hms(0, 11, 58) },
          { name: "Isomerism", start: hms(0, 17, 10) },
        ],
      },
      {
        title: "Valence bond theory and crystal field theory",
        mainTopic: "Crystal field theory",
        start: hms(0, 23, 10),
        end: hms(0, 28, 23),
        subtopics: [
          { name: "Valence bond theory", start: hms(0, 23, 10) },
          { name: "Crystal field theory", start: hms(0, 27, 8) },
          { name: "The spectrochemical series", start: hms(0, 28, 6) },
        ],
      },
      {
        title: "Octahedral and tetrahedral complexes",
        mainTopic: "Crystal field splitting",
        start: hms(0, 28, 23),
        end: hms(0, 32, 9),
        subtopics: [
          { name: "Octahedral complexes", start: hms(0, 28, 23) },
          { name: "Tetrahedral complexes", start: hms(0, 31, 6) },
          { name: "Limitations of crystal field theory", start: hms(0, 31, 40) },
        ],
      },
      {
        title: "Colour, organometallic compounds, and uses",
        mainTopic: "Applications of coordination compounds",
        start: hms(0, 32, 9),
        end: 2230,
        subtopics: [
          { name: "Colour of coordination compounds", start: hms(0, 32, 9) },
          { name: "Organometallic compounds", start: hms(0, 32, 44) },
          { name: "Importance of coordination compounds", start: hms(0, 34, 33) },
        ],
      },
    ],
    [
      "Werner's theory",
      "Ligands",
      "Coordination number",
      "Nomenclature",
      "Isomerism",
      "Crystal field theory",
    ],
    [
      "Werner's theory separates a primary valence from a secondary valence, which is the coordination number.",
      "Naming and isomerism depend on the ligands attached to the central metal and how those ligands are arranged.",
      "Crystal field theory explains the colour and magnetic behaviour of octahedral and tetrahedral complexes.",
    ],
  ),
  lecture(
    "machine-learning",
    "Let's build GPT: from scratch, in code, spelled out.",
    "Machine Learning",
    "kCc8FmEb1nY",
    hms(1, 56, 20),
    [
      {
        title: "Tokenizing Tiny Shakespeare and building batches",
        mainTopic: "Tokenization",
        start: 0,
        end: hms(0, 22, 11),
        subtopics: [
          { name: "ChatGPT, Transformers, nanoGPT, and Shakespeare", start: 0 },
          { name: "Reading and exploring the data", start: hms(0, 7, 52) },
          { name: "Tokenization and the train/validation split", start: hms(0, 9, 28) },
          { name: "Batches of text chunks", start: hms(0, 14, 27) },
        ],
      },
      {
        title: "A bigram language-model baseline",
        mainTopic: "Bigram language model",
        start: hms(0, 22, 11),
        end: hms(0, 42, 13),
        subtopics: [
          { name: "Bigram model, loss, and generation", start: hms(0, 22, 11) },
          { name: "Training the bigram model", start: hms(0, 34, 53) },
          { name: "Porting the notebook to a script", start: hms(0, 38, 0) },
        ],
      },
      {
        title: "From averaging context to self-attention",
        mainTopic: "Self-attention",
        start: hms(0, 42, 13),
        end: hms(1, 2, 0),
        subtopics: [
          { name: "Averaging past context with loops", start: hms(0, 42, 13) },
          { name: "Matrix multiply as weighted aggregation", start: hms(0, 47, 11) },
          { name: "Adding softmax", start: hms(0, 54, 42) },
          { name: "Positional encoding", start: hms(1, 0, 18) },
        ],
      },
      {
        title: "Self-attention",
        mainTopic: "Scaled self-attention",
        start: hms(1, 2, 0),
        end: hms(1, 19, 11),
        subtopics: [
          { name: "Self-attention with queries, keys, and values", start: hms(1, 2, 0) },
          { name: "Attention as communication", start: hms(1, 11, 38) },
          { name: "Why scaled attention divides by the square root of the head size", start: hms(1, 16, 56) },
        ],
      },
      {
        title: "The Transformer block",
        mainTopic: "Transformer block",
        start: hms(1, 19, 11),
        end: hms(1, 32, 51),
        subtopics: [
          { name: "Inserting one self-attention block", start: hms(1, 19, 11) },
          { name: "Multi-headed self-attention", start: hms(1, 21, 59) },
          { name: "Feedforward layers", start: hms(1, 24, 25) },
          { name: "Residual connections", start: hms(1, 26, 48) },
        ],
      },
      {
        title: "Layer norm, dropout, and a larger model",
        mainTopic: "Layer normalization",
        start: hms(1, 32, 51),
        end: hms(1, 48, 53),
        subtopics: [
          { name: "Layer normalization", start: hms(1, 32, 51) },
          { name: "Scaling the model and adding dropout", start: hms(1, 37, 49) },
          { name: "Walkthrough of nanoGPT", start: hms(1, 46, 22) },
        ],
      },
      {
        title: "Pretraining, finetuning, and conclusions",
        mainTopic: "Pretraining and finetuning",
        start: hms(1, 48, 53),
        end: hms(1, 56, 20),
        subtopics: [
          { name: "Pretraining, finetuning, and RLHF", start: hms(1, 48, 53) },
          { name: "Conclusions", start: hms(1, 54, 32) },
        ],
      },
    ],
    [
      "Tokenization",
      "Bigram language model",
      "Self-attention",
      "Multi-head attention",
      "Residual connections",
      "Layer normalization",
    ],
    [
      "A character-level language model predicts the next token from a fixed window of previous tokens.",
      "Self-attention replaces a flat average of the past with learned query, key, and value weights.",
      "Residual connections, layer norm, and dropout are what let that block scale from a bigram toy to a small GPT.",
    ],
  ),
  lecture(
    "data-structures",
    "MIT 6.006: Data Structures and Dynamic Arrays",
    "Data Structures & Algorithms",
    "CHhwJjR0mZA",
    hms(0, 50, 18),
    [
      {
        title: "Interfaces versus data structures",
        mainTopic: "Interfaces versus data structures",
        start: 0,
        end: hms(0, 8, 0),
        subtopics: [
          { name: "An interface specifies operations and a data structure implements them", start: 0 },
          { name: "Sequence and set interfaces", start: hms(0, 0, 40) },
        ],
      },
      {
        title: "Static arrays and word size",
        mainTopic: "Static arrays",
        start: hms(0, 8, 0),
        end: hms(0, 21, 30),
        subtopics: [
          { name: "Static arrays", start: hms(0, 8, 0) },
          { name: "Word size", start: hms(0, 14, 30) },
        ],
      },
      {
        title: "Linked lists and dynamic sequences",
        mainTopic: "Linked lists",
        start: hms(0, 21, 30),
        end: hms(0, 39, 20),
        subtopics: [
          { name: "Linked lists", start: hms(0, 21, 30) },
          { name: "Insert and delete on a dynamic sequence", start: hms(0, 25, 5) },
        ],
      },
      {
        title: "Dynamic array size and resizing",
        mainTopic: "Dynamic arrays",
        start: hms(0, 39, 20),
        end: hms(0, 46, 30),
        subtopics: [
          { name: "Array length versus allocated size", start: hms(0, 39, 20) },
          { name: "Resizing when the array is full", start: hms(0, 41, 50) },
        ],
      },
      {
        title: "Amortized cost of doubling an array",
        mainTopic: "Amortized analysis",
        start: hms(0, 46, 30),
        end: hms(0, 50, 18),
        subtopics: [
          { name: "Constant amortized time", start: hms(0, 46, 30) },
          { name: "Charging a resize across later appends", start: hms(0, 49, 26) },
        ],
      },
    ],
    [
      "Interfaces versus data structures",
      "Static arrays",
      "Linked lists",
      "Dynamic arrays",
      "Amortized analysis",
    ],
    [
      "An interface says which operations a collection supports; a data structure decides how those operations are stored and run.",
      "A linked list makes local inserts cheap, while a static array makes indexing cheap.",
      "Doubling a dynamic array makes append constant time on average, even though a single resize copies every element.",
    ],
  ),
  lecture(
    "operating-systems",
    "Introduction to Memory Management in Linux",
    "Operating Systems",
    "7aONIVSXiJ8",
    hms(0, 51, 19),
    [
      {
        title: "Physical memory and a single address space",
        mainTopic: "Single address space",
        start: 0,
        end: 270,
        subtopics: [
          { name: "A single physical address space", start: 122 },
          { name: "No memory protection between processes", start: 141 },
        ],
      },
      {
        title: "What virtual memory maps",
        mainTopic: "Virtual memory",
        start: 270,
        end: 522,
        subtopics: [
          { name: "Mapping virtual addresses onto physical memory", start: 270 },
          { name: "Per-process protection", start: 347 },
        ],
      },
      {
        title: "The memory management unit and the TLB",
        mainTopic: "Translation lookaside buffer",
        start: 522,
        end: 778,
        subtopics: [
          { name: "The memory management unit", start: 522 },
          { name: "Translation lookaside buffer", start: 623 },
        ],
      },
      {
        title: "Kernel logical and kernel virtual addresses",
        mainTopic: "Kernel virtual memory",
        start: 778,
        end: 1415,
        subtopics: [
          { name: "Kernel virtual memory", start: 778 },
          { name: "Kernel logical addresses", start: 950 },
          { name: "High memory on 32-bit systems", start: 1257 },
        ],
      },
      {
        title: "User address spaces",
        mainTopic: "User virtual addresses",
        start: 1415,
        end: 1781,
        subtopics: [
          { name: "User virtual addresses", start: 1415 },
          { name: "The process memory map", start: 1542 },
          { name: "Page frame numbers", start: 1677 },
        ],
      },
      {
        title: "Lazy allocation and page tables",
        mainTopic: "Page tables",
        start: 1781,
        end: 2379,
        subtopics: [
          { name: "Lazy allocation", start: 1781 },
          { name: "Page tables", start: 2135 },
        ],
      },
      {
        title: "Swapping and user-space allocation",
        mainTopic: "Swapping",
        start: 2379,
        end: 2905,
        subtopics: [
          { name: "Swapping a page frame to storage", start: 2379 },
          { name: "Copying a frame to disk", start: 2448 },
          { name: "malloc, mmap, and the program break", start: 2823 },
        ],
      },
      {
        title: "Summary and questions",
        mainTopic: "Linux virtual memory",
        start: 2905,
        end: hms(0, 51, 19),
        subtopics: [
          { name: "Summary of Linux virtual memory", start: 2905 },
          { name: "Audience questions", start: 2956 },
        ],
      },
    ],
    [
      "Virtual memory",
      "Memory management unit",
      "Translation lookaside buffer",
      "Page tables",
      "Lazy allocation",
      "Swapping",
    ],
    [
      "Virtual memory gives each process its own addresses and keeps those addresses separate from physical RAM.",
      "The MMU and TLB translate a virtual page into a physical frame, and a miss becomes a page fault.",
      "Linux allocates the physical frame only when the process first touches the page, and it can later swap that frame out.",
    ],
  ),
  lecture(
    "database-systems",
    "CMU 15-445: Database Storage I",
    "Database Systems",
    "1D81vXw2T_w",
    hms(1, 19, 57),
    [
      {
        title: "Where the disk manager sits in a DBMS",
        mainTopic: "Disk manager",
        start: 0,
        end: 425,
        subtopics: [
          { name: "Storage lectures in the DBMS stack", start: 0 },
          { name: "Disk files versus the buffer pool", start: 298 },
        ],
      },
      {
        title: "The storage hierarchy and access patterns",
        mainTopic: "Storage hierarchy",
        start: 425,
        end: 1147,
        subtopics: [
          { name: "Volatile and non-volatile storage", start: 425 },
          { name: "Sequential access versus random access", start: 600 },
        ],
      },
      {
        title: "Why the DBMS manages its own files",
        mainTopic: "DBMS file management",
        start: 1147,
        end: 2033,
        subtopics: [
          { name: "Leaving database files to the operating system", start: 1147 },
          { name: "What the storage manager owns in this lecture", start: 1609 },
        ],
      },
      {
        title: "Pages, page identifiers, and the page directory",
        mainTopic: "Database pages",
        start: 2033,
        end: 3141,
        subtopics: [
          { name: "Fixed-size pages", start: 2033 },
          { name: "Page identifiers and indirection", start: 2183 },
          { name: "Page directory", start: 2485 },
        ],
      },
      {
        title: "How tuples are laid out inside a page",
        mainTopic: "Slotted pages",
        start: 3141,
        end: 3657,
        subtopics: [
          { name: "Log-structured page layout", start: 3141 },
          { name: "Slotted pages", start: 3267 },
        ],
      },
      {
        title: "Record identifiers and tuple metadata",
        mainTopic: "Record identifiers",
        start: 3657,
        end: hms(1, 19, 57),
        subtopics: [
          { name: "Record IDs", start: 3657 },
          { name: "Null values in a tuple", start: 4344 },
        ],
      },
    ],
    [
      "Storage hierarchy",
      "Fixed-size pages",
      "Page directory",
      "Slotted pages",
      "Record identifiers",
    ],
    [
      "A disk-oriented DBMS stores data in fixed-size pages and keeps an in-memory buffer pool in front of those pages.",
      "A page directory maps a page identifier to the page's location instead of exposing raw file offsets.",
      "A slotted page grows a slot array forward and tuple data backward so variable-length records can be inserted and deleted.",
    ],
  ),
  lecture(
    "climate-change",
    "Climate Systems Engineering in Context",
    "Environmental Science",
    "I1P6i6927Fo",
    hms(1, 12, 26),
    [
      {
        title: "Climate systems engineering and concerns about sunlight reflection",
        mainTopic: "Sunlight reflection",
        start: 0,
        end: hms(0, 11, 13),
        subtopics: [
          { name: "Climate systems engineering in context", start: 0 },
          { name: "Concerns about sunlight reflection", start: hms(0, 2, 38) },
        ],
      },
      {
        title: "Four-dimensional climate action and the DICE model",
        mainTopic: "DICE model",
        start: hms(0, 11, 13),
        end: hms(0, 28, 58),
        subtopics: [
          { name: "Decarbonization, carbon removal, sunlight reflection, and adaptation", start: hms(0, 11, 13) },
          { name: "The DICE integrated assessment model", start: hms(0, 21, 6) },
        ],
      },
      {
        title: "Adding sunlight reflection to DICE",
        mainTopic: "Modified DICE model",
        start: hms(0, 28, 58),
        end: hms(0, 34, 36),
        subtopics: [
          { name: "The modified DICE model", start: hms(0, 28, 58) },
          { name: "The value of knowing more about sunlight reflection", start: hms(0, 31, 15) },
        ],
      },
      {
        title: "Comparing carbon removal and sunlight reflection",
        mainTopic: "Carbon dioxide removal",
        start: hms(0, 34, 36),
        end: hms(0, 44, 53),
        subtopics: [
          { name: "Risks of sunlight reflection versus carbon dioxide removal", start: hms(0, 34, 36) },
          { name: "Key events and preference order", start: hms(0, 40, 14) },
        ],
      },
      {
        title: "Politics of sunlight reflection and audience questions",
        mainTopic: "Politics of sunlight reflection",
        start: hms(0, 44, 53),
        end: hms(1, 12, 26),
        subtopics: [
          { name: "Politics of sunlight reflection", start: hms(0, 44, 53) },
          { name: "Audience questions", start: hms(0, 57, 53) },
        ],
      },
    ],
    [
      "Sunlight reflection",
      "Carbon dioxide removal",
      "DICE model",
      "Decarbonization",
      "Adaptation",
    ],
    [
      "Climate action has more than one lever: cutting emissions, removing carbon, reflecting sunlight, and adapting.",
      "The DICE model is used here to compare those levers rather than to treat any one technology as the whole response.",
      "Sunlight reflection raises political and risk questions that sit alongside the engineering case for carbon removal.",
    ],
  ),
];

function validateTemplateLibrary(templates: readonly VideoTemplate[]) {
  if (templates.length !== 6) throw new Error("The Viducate demo library must contain exactly six templates.");
  for (const item of templates) {
    if (item.duration < 1800 || item.duration > 7200) throw new Error(`Invalid duration for ${item.id}.`);
    if (item.segments.length < 4 || item.segments.length > 8) throw new Error(`Invalid segment count for ${item.id}.`);
    if (item.segments[0]?.start !== 0 || item.segments.at(-1)?.end !== item.duration) throw new Error(`Segments do not cover ${item.id}.`);
    for (let index = 0; index < item.segments.length; index += 1) {
      const segment = item.segments[index];
      const previous = item.segments[index - 1];
      if (segment.start < 0 || segment.end > item.duration || segment.start >= segment.end || (previous && previous.end !== segment.start) || segment.subtopics.length < 2 || segment.subtopics.some((topic) => topic.start < segment.start || topic.start >= segment.end)) throw new Error(`Invalid timestamps for ${item.id}.`);
    }
  }
}
validateTemplateLibrary(videoTemplates);
export const youtubeUrl = (youtubeId: string) =>
  `https://www.youtube.com/watch?v=${youtubeId}`;
export const youtubeThumbnail = (youtubeId: string) =>
  `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
export const getTemplate = (id: string) =>
  videoTemplates.find((item) => item.id === id) ?? videoTemplates[0];
function cloneTemplate(
  templateId: string,
  id: number,
  segmentStartId: number,
  currentTime = 0,
): { video: DemoVideo; segments: DemoSegment[] } {
  const source = getTemplate(templateId);
  return {
    video: {
      id,
      templateId: source.id,
      title: source.title,
      thumbnail_url: youtubeThumbnail(source.youtubeId),
      url: youtubeUrl(source.youtubeId),
      duration: source.duration,
      currentTime,
      type: "url",
      subject: source.subject,
      status: "completed",
      bookmarks: [],
      completedSegmentIds: [],
    },
    segments: source.segments.map((segment, index) => ({
      ...segment,
      id: segmentStartId + index,
      videoId: id,
      subtopics: segment.subtopics.map((topic) => ({ ...topic })),
    })),
  };
}
const initial = [
  cloneTemplate("neural-networks", 101, 1001, 248),
  cloneTemplate("data-structures", 102, 2001, 124),
  cloneTemplate("climate-change", 103, 3001),
];
export const demoSegments: DemoSegment[] = initial.flatMap(
  (item) => item.segments,
);
type DemoState = {
  videos: DemoVideo[];
  segments: DemoSegment[];
  nextTemplateIndex: number;
  nextVideoId: number;
  nextSegmentId: number;
  profile: {
    first_name: string;
    last_name: string;
    email: string;
    study_field: string;
    language_preference: string;
    has_password: boolean;
  };
  preferences: Record<
    number,
    {
      summaryLang: "en" | "ar" | "Same as Video";
      quizLang: "en" | "ar" | "Same as Video";
      flashcardsLang: "en" | "ar" | "Same as Video";
    }
  >;
};
// Bump this whenever the template catalogue changes so stale mock records do
// not retain an earlier video's duration or segment layout.
const storageKey = "viducate_mock_demo_state_v5";
const initialState = (): DemoState => ({
  videos: initial.map((item) => ({
    ...item.video,
    bookmarks: [...item.video.bookmarks],
    completedSegmentIds: [...item.video.completedSegmentIds],
  })),
  segments: initial.flatMap((item) => item.segments),
  nextTemplateIndex: 0,
  nextVideoId: 104,
  nextSegmentId: 4001,
  profile: {
    first_name: "Maya",
    last_name: "Hassan",
    email: "demo@viducate.com",
    study_field: "Computer Science",
    language_preference: "en",
    has_password: true,
  },
  preferences: {},
});
function load(): DemoState {
  try {
    const saved = localStorage.getItem(storageKey);
    const parsed = saved ? (JSON.parse(saved) as Partial<DemoState>) : null;
    return parsed?.segments && parsed.videos
      ? { ...initialState(), ...parsed }
      : initialState();
  } catch {
    return initialState();
  }
}
let state = load();
function persist() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}
export const demoStore = {
  get videos() {
    return state.videos;
  },
  get profile() {
    return state.profile;
  },
  getVideo(id: number) {
    return state.videos.find((video) => video.id === id);
  },
  getTemplateForVideo(id: number) {
    const video = this.getVideo(id);
    return getTemplate(video?.templateId ?? "neural-networks");
  },
  segmentsFor(videoId: number) {
    return state.segments.filter((segment) => segment.videoId === videoId);
  },
  createFromNextTemplate() {
    const source =
      videoTemplates[state.nextTemplateIndex % videoTemplates.length];
    state.nextTemplateIndex += 1;
    const clone = cloneTemplate(
      source.id,
      state.nextVideoId++,
      state.nextSegmentId,
    );
    state.nextSegmentId += clone.segments.length;
    state.videos = [clone.video, ...state.videos];
    state.segments = [...state.segments, ...clone.segments];
    persist();
    return clone.video;
  },
  deleteVideo(id: number) {
    state.videos = state.videos.filter((video) => video.id !== id);
    state.segments = state.segments.filter((segment) => segment.videoId !== id);
    persist();
  },
  updateProgress(
    id: number,
    currentTime: number,
    bookmarks: number[],
    completedSegmentIds: number[],
  ) {
    const video = this.getVideo(id);
    if (!video) return;
    Object.assign(video, { currentTime, bookmarks, completedSegmentIds });
    persist();
  },
  updateProfile(profile: Partial<DemoState["profile"]>) {
    state.profile = { ...state.profile, ...profile };
    persist();
  },
  getPreferences(videoId: number) {
    return (
      state.preferences[videoId] ??
      ({
        summaryLang: "Same as Video",
        quizLang: "Same as Video",
        flashcardsLang: "Same as Video",
      } as const)
    );
  },
  savePreferences(
    videoId: number,
    preferences: DemoState["preferences"][number],
  ) {
    state.preferences[videoId] = preferences;
    persist();
  },
};
