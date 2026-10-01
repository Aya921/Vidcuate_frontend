import { useLearningSession } from "../../../../core/hooks/useLearningContent";
import { formatDuration } from "../../../../core/utils/fomat_time";

export function useVideoProgress() {
  const { currentTime, duration } = useLearningSession();

  const percent =
    duration && duration > 0
      ? Math.min(Math.round((currentTime / duration) * 100), 100)
      : 0;

  return {
    percent,
    remaining: 100 - percent,
    watchedFormatted: formatDuration(currentTime),
    totalFormatted: duration ? formatDuration(duration) : "00:00",
  };
}
