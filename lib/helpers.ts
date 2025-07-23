export function formatTime(dateStr: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(dateStr));
}

export function formatDate(dateStr: string) {
  // For '7-Jul-2025' style
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
    .format(new Date(dateStr))
    .replace(/ /g, "-");
}

export function formatDate2(dateStr: string) {
  const dt = new Date(dateStr);
  const month = dt.getMonth() + 1; // Zero-based months: add 1
  const day = dt.getDate().toString().padStart(2, "0"); // Always 2 digits
  const year = dt.getFullYear();
  return `${month}/${day}/${year}`;
}
export function getOffsetPxFromTime(
  isoTimestamp: string,
  timelineWidth = 2350
) {
  const date = new Date(isoTimestamp);
  if (isNaN(date.getTime())) return 0;

  const totalSeconds =
    date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();

  const secondsInDay = 27 * 3600;

  const offsetPx = (totalSeconds / secondsInDay) * timelineWidth;
  return offsetPx;
}

export function getTimeFromLeftPx(px: number, timelineWidth = 2350) {
  const secondsInDay = 27 * 3600;
  const timeInSeconds = (px / timelineWidth) * secondsInDay;

  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}
