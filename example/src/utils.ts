export function tourl(partial: string): string {
  if (!partial.match(/^https?:\/\//)) return "https://" + partial
  return partial
}
