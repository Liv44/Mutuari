export function getDateString(date) {
  const dateString = new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    // year: "numeric",
  });
  return dateString;
}
