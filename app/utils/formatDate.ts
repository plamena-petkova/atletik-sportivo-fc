export function formatDate(isoDate: string | undefined): string {
  if (!isoDate) return "";

  const date = new Date(isoDate);
  const formatted = date.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return `📅 ${formatted.replace(" at ", " ⏰ ")}`;
}
