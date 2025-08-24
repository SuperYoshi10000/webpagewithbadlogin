<script lang="ts">
    import Button from "./Button.svelte";

    
    export let data: { sessionId?: string, username?: string };
</script>

<header>
    <nav>
        <span id="title">My Website</span>
        <Button nav href="/">Home</Button>
        {#if data.sessionId}
            <Button nav href="/page/{data.username}">Your Page</Button>
            <Button nav href="/page/{data.username}/edit">Edit Your Page</Button>
            <Button nav href="/logout">Log Out</Button>
        {:else}
            <Button nav href="/signup" float="right">Sign Up</Button>
            <Button nav href="/login" float="right">Log In</Button>
        {/if}
    </nav>
</header>

<style>
    nav {
        background-color: #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
        /* align-content: center; */
        gap: 1em;
    }
    :global(nav > *) {
        width: 150px;
        border-radius: 10px;
    }

    #title {
        display: inline-block;
        padding: 0.5em;
        min-width: 100px;
        height: 2em;
        text-align: center;
        font-weight: bold;
        font-size: 1.25em;
        display: flex;
        /* text-align: center; */
        justify-content: center;
        align-items: center;
        /* align-content: center; */
        /* vertical-align: middle; */
    }
</style>