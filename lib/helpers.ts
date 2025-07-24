// Get pixel offset from a UTC ISO timestamp
export function getOffsetPxFromTime(
  isoTimestamp: string,
  timelineWidth = 2350
) {
  const date = new Date(isoTimestamp);
  if (isNaN(date.getTime())) return 0;

  const totalSeconds =
    date.getUTCHours() * 3600 +
    date.getUTCMinutes() * 60 +
    date.getUTCSeconds();

  const secondsInDay = 27 * 3600;
  return (totalSeconds / secondsInDay) * timelineWidth;
}

// Convert left px on timeline to UTC time string
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

// Format a UTC time for display (hh:mm:ss)
export function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return `${String(date.getUTCHours()).padStart(2, "0")}:${String(
    date.getUTCMinutes()
  ).padStart(2, "0")}:${String(date.getUTCSeconds()).padStart(2, "0")}`;
}

// Format a UTC date (like 7-Jul-2025)
export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-GB", {
    month: "short",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
}

// Format as MM/DD/YYYY in UTC
export function formatDate2(dateStr: string) {
  const dt = new Date(dateStr);
  const month = dt.getUTCMonth() + 1;
  const day = dt.getUTCDate().toString().padStart(2, "0");
  const year = dt.getUTCFullYear();
  return `${month}/${day}/${year}`;
}

export const parseTimeToSeconds = (timeString: string): number => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + (seconds || 0);
};



export const formatDuration = (startTime: string, endTime: string): string => {
  const startSeconds = parseTimeToSeconds(formatTime(startTime));
  const endSeconds = parseTimeToSeconds(formatTime(endTime));
  const durationSeconds = endSeconds - startSeconds;
  
  if (durationSeconds < 60) {
    return `${durationSeconds}s`;
  } else {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = durationSeconds % 60;
    return `${minutes}m ${seconds}s`;
  }
};
