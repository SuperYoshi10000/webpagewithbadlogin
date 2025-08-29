import * as db from "$lib/db";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
    const userId = (await db.getUserFromSession(cookies))?.id;
    if (userId) {
        cookies.delete("session_id", { path: "/" });
        await db.deleteAllSessions(userId);
    }
    redirect(303, "/");
}