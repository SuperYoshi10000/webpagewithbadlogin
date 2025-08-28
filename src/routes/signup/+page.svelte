<script lang="ts">
  import Button from "../../components/Button.svelte";

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
        console.log(response);
        if (!response.ok) {
            const error = await response.text();
            console.error("Signup failed:", error);
            alert(`Signup failed: ${error}`);
            return;
        }
        location.href = `/page/${username}`;
    }
</script>

<title>Sign Up</title>
<div class="content">
    <h1>Sign Up</h1>
    <!-- svelte-ignore component_name_lowercase -->
    <form>
        <label for="username" placeholder="Username">Username</label>
        <input type="text" id="username" bind:value={username} />
        <br/>
        <p>Upload your story that you want to use for authentication. The story must be uploaded as a PDF.</p>
        <input type="file" id="authentication" accept=".pdf" bind:files={authentication} />
        <br/>
        <Button action={submit}>Sign Up</Button>
    </form>
    <p>Already have an account? <a href="/login">Log in here</a>.</p>
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