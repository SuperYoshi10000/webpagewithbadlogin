import * as pg from 'pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import type { Cookies } from '@sveltejs/kit';


interface User {
    id: number;
    username: string;
    // Excluded by default for security; must be specifically included
    authentication_hash?: string;
    display_name: string;
    profile_picture_url: string;
    created_at: Date;
    updated_at: Date;
    about: string;
    page_content: string;
    links: string;
}


let pool: pg.Pool;
let client: pg.PoolClient;

export async function initDatabase() {
    pool = new pg.Pool({
        user: process.env.DB_USER || "postgres",
        host: process.env.DB_HOST || "localhost",
        database: process.env.DB_NAME || "postedit",
        password: process.env.DB_PASSWORD || undefined,
        port: Number(process.env.DB_PORT || 5432),
        ssl: process.env.DB_SSL === "false" ? false : Boolean(process.env.DB_SSL) || false,
    });
    console.log("Connecting to database...");
    client = await pool.connect();
    console.log("Connected to database.");
    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            authentication_hash VARCHAR(255) NOT NULL,
            display_name VARCHAR(255) NOT NULL DEFAULT '',
            profile_picture_url VARCHAR(2083) NOT NULL DEFAULT '',
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
            about TEXT NOT NULL DEFAULT '',
            page_content TEXT NOT NULL DEFAULT '',
            links TEXT NOT NULL DEFAULT ''
        );
    `);
    await client.query(`
        CREATE TABLE IF NOT EXISTS sessions (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            user_id INT NOT NULL,
            session_id VARCHAR(255) NOT NULL UNIQUE,
            expiration TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '24 hours',
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `);
}

export async function createUser(username: string, content: string) {
    const existingUser = await getUser(username).catch(_ => null);
    if (existingUser) throw Error("User already exists");
    const hash = await bcrypt.hash(content, 10);
    const {rows: [user]} = await client.query("INSERT INTO users (username, authentication_hash, display_name) VALUES ($1, $2, $3) RETURNING *", [username, hash, username]);
    return createSession(user.id);
}

export async function authenticateUser(username: string, content: string) {
    const user = await getUser(username, ["id","authentication_hash"]).catch(_ => null);
    if (!user) return false;
    const { authentication_hash } = user;
    if (!bcrypt.compare(content, authentication_hash)) return null;
    return createSession(user.id);
}

export async function updateAuthentication(userId: number, content: string) {
    const hash = await bcrypt.hash(content, 10);
    const result = await client.query("UPDATE users SET authentication_hash = $1, updated_at = NOW() WHERE id = $2", [hash, userId]);
    return (result.rowCount ?? 0) > 0;
}

export async function getUser<C extends (keyof User)[] = [Exclude<keyof User, "authentication_hash">]>(name: string, columns?: C): Promise<{ [K in C[number]]: Required<User>[K] }>;
export async function getUser<C extends (keyof User)[] = [Exclude<keyof User, "authentication_hash">]>(id: number, columns?: C): Promise<{ [K in C[number]]: Required<User>[K] }>;
export async function getUser<C extends (keyof User)[] = [Exclude<keyof User, "authentication_hash">]>(
    nameOrId: string | number, columns: C = ["id","username","display_name","profile_picture_url","created_at","updated_at","about","page_content","links"] as C
): Promise<{ [K in C[number]]: Required<User>[K] }> {
    const result = await client.query(`SELECT ${columns.join(',')} FROM users WHERE ${typeof nameOrId === "string" ? "username" : "id"} = $1`, [nameOrId]);
    return result.rows[0] as { [K in C[number]]: Required<User>[K] };
}

export async function getUserFromSession(cookies: Cookies): Promise<User | null>;
export async function getUserFromSession(sessionId: string): Promise<User | null>;
export async function getUserFromSession(cookiesOrSessionId: string | Cookies): Promise<User | null> {
    if (typeof cookiesOrSessionId !== "string") {
        const sessionId = cookiesOrSessionId.get("session_id");
        if (!sessionId) return null;
        cookiesOrSessionId = sessionId;
    }
    const {rows: [user]} = await client.query("SELECT user_id FROM sessions WHERE session_id = $1 AND expiration > NOW()", [cookiesOrSessionId]);
    if (!user) return null;
    return getUser(Number(user.user_id));
}

async function createSession(userId: number) {
    const sessionId = crypto.randomUUID();
    await client.query("INSERT INTO sessions (user_id, session_id) VALUES ($1, $2)", [userId, sessionId]);
    return sessionId;
}
export async function deleteSession(sessionId: string) {
    const result = await client.query("DELETE FROM sessions WHERE session_id = $1", [sessionId]);
    return (result.rowCount ?? 0) > 0;
}
export async function deleteAllSessions(userId: number) {
    const result = await client.query("DELETE FROM sessions WHERE user_id = $1", [userId]);
    return result.rowCount;
}

export async function updatePage(username: string, display_name: string, about: string, page_content: string, links: string) {
    await client.query(`
        UPDATE users
        SET display_name = $2, about = $3, page_content = $4, links = $5, updated_at = NOW()
        WHERE username = $1;    
    `, [username, display_name, about, page_content, links]);
    console.log(`Updated page for user ${username}`);
}

export async function getAllUsers() {
    const {rows: users} = await client.query("SELECT id, username, display_name, profile_picture_url FROM users");
    return users as {
        id: number;
        username: string;
        display_name: string;
        profile_picture_url: string;
    }[];
}