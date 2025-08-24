import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
    cookies.delete("session_id", { path: "/" });
    redirect(303, "/");
}