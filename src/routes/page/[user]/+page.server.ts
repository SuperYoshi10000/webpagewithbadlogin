import * as db from "$lib/db";
import { error, redirect } from "@sveltejs/kit";
import sanitizeHTML from 'sanitize-html';

export async function load({ params }) {
    let data = await db.getUser(params.user);
    if (!data) {
        error(404, "User not found");
    }
    
    return {
        ...data,
        pageHtml: sanitizeHTML(data.page_content)
    };
}