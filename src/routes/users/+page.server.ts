import * as db from "$lib/db";

export async function load() {
    const users = await db.getAllUsers();
    return { users };
}