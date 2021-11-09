import moment from "moment"

export function formatDate(date: string): string {
    return moment(String(date)).format('MMMM DD, YYYY')
}
 
export function contentExcerpt(content: string, words: number): string {
    return content.split(" ").splice(0, words).join(" ") + "..."
}