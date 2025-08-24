import * as sanitizeHtml from "sanitize-html";

export function bbcodeToHtml(content: string) {
    return sanitizeHtml(content);
}