import * as db from "$lib/db"

export async function load({ cookies }) {
    const sessionId = cookies.get("session_id");
    if (!sessionId) return {};
    const {username} = await db.getUserFromSession(sessionId) || {};
    return { sessionId, username };
}