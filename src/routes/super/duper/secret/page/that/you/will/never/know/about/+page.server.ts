import * as ai from "$lib/ai";

export async function load() {

}

export const actions = {
    async default({ request }) {
        const formData = await request.formData();
        const text = formData.get("text");
        if (typeof text !== "string") return { error: "Invalid input" };
        const result = (await ai.checkIfStoryIsGood(text, true)).replaceAll('<', "&lt;")/*.replace(/(\w+)$/, `<strong>$1</strong>`)*/;
        return { result };
    }
}