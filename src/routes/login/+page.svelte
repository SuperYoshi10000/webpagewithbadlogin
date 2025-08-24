<script lang="ts">
  import { goto } from "$app/navigation";
  import { redirect } from "@sveltejs/kit";

    let username: string;
    let authentication: FileList;

    async function submit() {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("authentication", authentication[0]);
        const response = await fetch("/login", {
            method: "POST",
            body: formData
        });
        if (!response.ok) console.error("Login failed:", await response.text());
        goto(`/page/${username}`);
    }
</script>

<div class="content">
    <h1>Login</h1>
    <!-- svelte-ignore component_name_lowercase -->
    <form on:submit|preventDefault={submit}>
        <label for="username">Username</label>
        <input type="text" id="username" bind:value={username} />
        <br/>
        <p>Upload your story for authentication. The story must be uploaded as a PDF.</p>
        <input type="file" id="authentication" accept=".pdf" bind:files={authentication} />
        <br/>
        <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="/signup">Sign up here</a>.</p>
</div>