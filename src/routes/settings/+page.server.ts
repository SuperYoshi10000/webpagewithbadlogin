import * as db from "$lib/db";
import * as ai from "$lib/ai";
//@ts-ignore
import pdf from "pdf-parse/lib/pdf-parse";
import { fail } from "@sveltejs/kit";

export const actions = {
    async updateAuth({ request, cookies }) {
        const formData = await request.formData();
        const authOld = formData.get("authentication-old");
        const authNew = formData.get("authentication-new");
        if (!(authOld instanceof File) || !(authNew instanceof File)) {
            return fail(400, { error: "Wrong input type" });
        }

        const pdfFileOld = Buffer.from(await authOld.bytes());
        // pdf-parse is broken
        const pdfDataOld = await (pdf as typeof import("pdf-parse"))(pdfFileOld);
        const contentOld = pdfDataOld.text;

        const pdfFileNew = Buffer.from(await authNew.bytes());
        // pdf-parse is still broken. It was not fixed in the last 5 milliseconds.
        const pdfDataNew = await (pdf as typeof import("pdf-parse"))(pdfFileNew);
        const contentNew = pdfDataNew.text;

        const user = await db.getUserFromSession(cookies);
        if (!user) return fail(403, { error: "Not logged in" });
        const newSessionId = await db.authenticateUser(user?.username || "", contentOld);
        if (!newSessionId) return fail(403, { error: "Old authentication incorrect" });
        
        const storyIsGood = await ai.checkIfStoryIsGood(contentNew);
        if (!storyIsGood) return fail(400, { error: "The story is not good enough." });

        await db.deleteSession(cookies.get("session_id") || "");
        cookies.set("session_id", newSessionId, { path: "/" });
    }
};