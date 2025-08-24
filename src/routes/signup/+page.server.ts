import * as db from "$lib/db";
import * as ai from "$lib/ai";
//@ts-ignore
import pdf from "pdf-parse/lib/pdf-parse";

export const actions = {
    async default({ request, cookies }) {
        console.log("Signup action called", request);

        const formData = await request.formData();
        const username = formData.get("username");
        const authentication = formData.get("authentication");

        console.log("Form data received:", formData);   

        if (!username || !authentication) return { error: "Username and authentication are required." };
        if (username instanceof File || !(authentication instanceof File)) return { error: "Invalid input types." };
        
        console.log("Creating user:", username);

        const pdfFile = Buffer.from(await authentication.bytes());
        // pdf-parse is broken
        const pdfData = await (pdf as typeof import("pdf-parse"))(pdfFile);
        const content = pdfData.text;


        const storyIsGood = await ai.checkIfStoryIsGood(content);
        if (!storyIsGood) return { error: "The story is not good enough." };

        const sessionId = await db.createUser(username, content);
        console.log("User created successfully.");
        
        cookies.set("session_id", sessionId, { path: "/" });
    }
}