<script lang="ts">
  import Button from "../../components/Button.svelte";

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
        if (!response.ok) {
            const error = await response.text();
            console.error("Login failed:", error);
            alert(`Login failed: ${error}`);
            return;
        }
        location.href = `/page/${username}`;
    }
</script>

<title>Log In</title>
<div class="content">
    <h1>Log In</h1>
    <!-- svelte-ignore component_name_lowercase -->
    <form>
        <label for="username" placeholder="Username">Username</label>
        <input type="text" id="username" bind:value={username} />
        <br/>
        <p>Upload your story for authentication. The story must be uploaded as a PDF.</p>
        <input type="file" id="authentication" accept=".pdf" bind:files={authentication} />
        <br/>
        <Button action={submit}>Log In</Button>
    </form>
    <p>Don't have an account? <a href="/signup">Sign up here</a>.</p>
</div>

<style>
    div.content {
        width: 50vw;
        min-width: 300px;
        margin: auto;
    }
    input {
        margin: 10px 0;
        width: 100%;
        height: 2em;
        border-radius: 0.5em;
    }
</style>