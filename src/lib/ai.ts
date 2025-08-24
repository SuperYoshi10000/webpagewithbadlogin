const API_URL = "https://ai.hackclub.com/chat/completions"
const SYSTEM_PROMPT = `
The user will give you a story. You will tell them if it is good or not.
You must respond with only 'yes' or 'no', and no punctuation.
The user must provide the actual story, and not just a title or description.
The user must provide a unique story that does not already exist.
If the user does not give you a story or what they give you is not a story, respond with 'no'.
`;

export async function checkIfStoryIsGood(story: string): Promise<boolean>;
export async function checkIfStoryIsGood(story: string, rawOutput: true): Promise<any>;
export async function checkIfStoryIsGood(story: string, rawOutput = false) {
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
    if (rawOutput) return message;
    if (!message) return false;
    return message.toLowerCase().endsWith("yes");
}