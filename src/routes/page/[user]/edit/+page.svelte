<script lang="ts">
  import Button from "../../../../components/Button.svelte";

    export let data;

    let {
        username,
        display_name,
        about,
        page_content,
        links,
    } = data;

    async function submit() {
        const formData = new FormData();
        formData.append("display_name", display_name);
        formData.append("about", about);
        formData.append("page_content", page_content);
        formData.append("links", links);
        const response = await fetch(location.href, {
            method: "POST",
            body: formData
        });
        if (!response.ok) console.error("Login failed:", await response.text());
        alert("Page updated!");
    }
</script>

<div class="content">
    <h1>Edit Your Page</h1>
    <form>
        <span id="username">{display_name} ({username})</span>
        <div>
            <label for="title">Name</label>
            <br/>
            <input type="text" id="title" bind:value={display_name} />
        </div>
        <div>
            <label for="content">Content</label>
            <br/>
            <textarea id="content" bind:value={page_content}></textarea>
        </div>
        <div>
            <label for="about">About Me</label>
            <br/>
            <textarea id="about" bind:value={about}></textarea>
        </div>
        <div>
            <label for="links">Links (one per line)</label>
            <br/>
            <textarea id="links" bind:value={links}></textarea>
        </div>
        <Button action={submit}>Save</Button>
    </form>
</div>

<title>Editing {display_name}'s Page</title>
<style>
    textarea {
        width: 100%;
        height: 10vh;
        resize: none;
    }
</style>