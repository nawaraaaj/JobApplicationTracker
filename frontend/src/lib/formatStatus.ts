export function formatStatus(status: string): string {
  // "TechnicalInterview" -> "Technical Interview"
  return status.replace(/([a-z])([A-Z])/g, "$1 $2");
}