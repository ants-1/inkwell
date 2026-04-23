import { marked } from "marked";

export const renderMarkdown = (markdown: string) => {
    return marked.parse(markdown);
}