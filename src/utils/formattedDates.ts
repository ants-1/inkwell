export const formattedNowDate = (date: Date | string) => {
  return new Date(date).toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};
