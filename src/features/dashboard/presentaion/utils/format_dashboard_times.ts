import type { IntlShape } from "react-intl";
import { formatDuration } from "../../../../core/utils/fomat_time";

export function formatTimeToHoursMinutes(
  seconds: number,
  intl: IntlShape,
): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return intl.formatMessage(
    { id: "common.time.hoursMinutes" },
    { hours, minutes },
  );
}

export function formatVideoTime(seconds: number): string {
  return formatDuration(seconds);
}
