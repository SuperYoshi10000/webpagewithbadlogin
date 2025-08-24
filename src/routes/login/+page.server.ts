import * as db from "$lib/db";
//@ts-ignore
import pdf from "pdf-parse/lib/pdf-parse";

export const actions = {
    async default({ request, cookies }) {
        const formData = await request.formData();
        const username = formData.get("username");
        const authentication = formData.get("authentication");
        if (!username || !authentication) return { error: "Username and authentication are required." };
        if (username instanceof File || !(authentication instanceof File)) return { error: "Invalid input types." };
        
        const pdfFile = Buffer.from(await authentication.bytes());
        // pdf-parse is broken
        const pdfData = await (pdf as typeof import("pdf-parse"))(pdfFile);
        const content = pdfData.text;

        const sessionId = await db.authenticateUser(username, content);
        if (!sessionId) return { error: "Authentication failed. Check your story." };

        cookies.set("session_id", sessionId, { path: "/" });
    }
}