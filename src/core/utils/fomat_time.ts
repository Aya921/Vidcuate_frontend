export function formatMessageTime(timestamp: number | string | Date): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
/** Formats elapsed seconds as MM:SS or HH:MM:SS without overflowing minutes. */
export function formatDuration(seconds: number): string {
  const totalSeconds = Number.isFinite(seconds)
    ? Math.max(0, Math.floor(seconds))
    : 0;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  return hours > 0
    ? `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
    : `${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
}

export function formatVideoTime(seconds: number): string {
  return formatDuration(seconds);
}
export function getFormattedTimeParts(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return {
    minutes: minutes.toString().padStart(2, "0"),
    seconds: remainingSeconds.toString().padStart(2, "0"),
  };
}
