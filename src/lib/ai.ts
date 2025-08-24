const API_URL = "https://ai.hackclub.com/chat/completions"
const SYSTEM_PROMPT = "The user will give you a story. You will tell them if it is good or not. You may only give a yes or no answer, and your response cannot contain a single other word.";

export async function checkIfStoryIsGood(story: string) {
    console.log("Checking if story is good...");
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            messages: [{
                role: "system",
                content: SYSTEM_PROMPT
            }, {
                role: "user",
                content: story
            }]
        })
    });

    if (!response.ok) return false;

    const body = await response.json();
    const message: string = body.choices?.[0]?.message?.content?.trim();
    if (!message) return false;
    return message.toLowerCase().endsWith("yes");
}