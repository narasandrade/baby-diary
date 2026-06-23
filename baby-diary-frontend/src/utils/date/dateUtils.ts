export function formatDate(dateString: string): string {
  const date = new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return date;
}

export function formatTime(dateString: string): string {
  const time = new Date(dateString).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return time;
}
