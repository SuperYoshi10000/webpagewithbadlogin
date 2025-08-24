<script lang="ts">

    async function send() {
        const formData = new FormData();
        formData.append("text", text);
        const response = await fetch("/super/duper/secret/page/that/you/will/never/know/about", {
            method: "POST",
            body: formData
        });
        if (!response.ok) console.error("Failed:", await response.text());
        const json = await response.json();
        console.log(json);
        result = JSON.parse(json.data)[1];
    }

    let text: string;
    let result: string;
</script>

<title>AI Test</title>
<h1>AI Test</h1>
<textarea bind:value={text}></textarea>
<button on:click={send}>Send</button>
<pre>{@html result}</pre>

<style>
    textarea {
        width: 100%;
        height: 50vh;
        resize: none;
    }
    pre {
        background-color: #f0f0f0;
        padding: 0.5em;
        border-radius: 0.5em;
        white-space: pre-wrap;
    }
</style>