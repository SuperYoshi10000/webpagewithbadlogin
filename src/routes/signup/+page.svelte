<script lang="ts">
    import { goto } from "$app/navigation";

    let username: string;
    let authentication: FileList;

    async function submit() {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("authentication", authentication[0]);
        const response = await fetch("/signup", {
            method: "POST",
            body: formData
        });
        if (!response.ok) console.error("Signup failed:", await response.text());
        goto(`/page/${username}`);
    }
</script>

<div class="content">
    <h1>Sign Up</h1>
    <!-- svelte-ignore component_name_lowercase -->
    <form on:submit|preventDefault={submit}>
        <label for="username">Username</label>
        <input type="text" id="username" bind:value={username} />
        <br/>
        <p>Upload your story that you want to use for authentication. The story must be uploaded as a PDF.</p>
        <input type="file" id="authentication" accept=".pdf" bind:files={authentication} />
        <br/>
        <button type="submit">Sign Up</button>
    </form>
    <p>Already have an account? <a href="/login">Log in here</a>.</p>
</div>