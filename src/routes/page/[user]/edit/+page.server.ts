import * as db from "$lib/db";
import { error, fail, redirect } from "@sveltejs/kit";

export async function load({ params, request, cookies }) {
    let data = await db.getUser(params.user);
    if (!data) {
        error(404, "User not found");
    }
    let {username} = data;
    let userFromSession = await db.getUserFromSession(cookies);
    if (!userFromSession || userFromSession.username !== username) {
        error(403, "You cannot edit this page");
    }
    return data;
}

export const actions = {
    async default({ params, request, cookies }) {
        console.log("Edit action called", request);
        const formData = await request.formData();
        console.log("Form data received:", formData);
        const username = params.user;
        if (!username || typeof username !== "string") return fail(400, { error: "Invalid username" });
        const display_name = formData.get("display_name") || username;
        const about = formData.get("about") || "";
        const page_content = formData.get("page_content") || "";
        const links = formData.get("links") || "";
        let userFromSession = await db.getUserFromSession(cookies);
        if (!userFromSession || userFromSession.username !== username) {
            return fail(403, { error: userFromSession ? "You cannot edit this page" : "Not logged in" });
        }
        await db.updatePage(username, display_name as string, about as string, page_content as string, links as string);
    }
}