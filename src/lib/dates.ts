export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const formatShortDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
