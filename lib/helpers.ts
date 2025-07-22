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