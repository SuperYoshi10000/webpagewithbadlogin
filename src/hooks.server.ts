import * as db from "$lib/db";
import type { ServerInit } from "@sveltejs/kit";

export const init: ServerInit = async () => {
    console.log("Initializing database...");
    await db.initDatabase();
    console.log("Database initialized.");
};
