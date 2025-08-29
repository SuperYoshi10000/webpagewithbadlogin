<script lang="ts">
    import Button from "$lib/components/Button.svelte";

    let authenticationOld: FileList;
    let authenticationNew: FileList;

    async function submit() {
        const formData = new FormData();
        formData.append("authentication-old", authenticationOld[0]);
        formData.append("authentication-new", authenticationNew[0]);
        const response = await fetch("/settings?/updateAuth", {
            method: "POST",
            body: formData
        });
        console.log(response);
        if (!response.ok) {
            const error = await response.text();
            console.error("Auth update failed:", error);
            alert(`Auth update failed: ${error}`);
            return;
        }
        location.reload();
    }
</script>
<div class="content">
    <h1>Settings</h1>
    <h2>Authentication</h2>
    <form>
        <label for="authentication-old">Upload your old story as a PDF.</label>
        <input type="file" id="authentication-old" accept=".pdf" bind:files={authenticationOld} />
        <br/>
        <label for="authentication-new">Upload your new story as a PDF.</label>
        <input type="file" id="authentication-new" accept=".pdf" bind:files={authenticationNew} />
        <br/>
        <Button action={submit}>Update</Button>
    </form>
    <h2>Log out</h2>
    <Button href="/logout">Log out</Button>
    <Button href="/logout/all">Log out from all devices</Button>
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
        font-size: 1.1em;
        padding: 0.25em;
    }
    input#authentication-old, input#authentication-new {
        align-content: center;
    }
</style>