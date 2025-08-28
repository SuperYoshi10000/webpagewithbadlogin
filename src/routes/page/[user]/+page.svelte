<script lang="ts">
    export let data;

    let {
        username,
        display_name,
        about,
        pageHtml,
    } = data;
    let links = data.links.split('\n').filter(link => link.trim().length > 0);

</script>

<title>{display_name}'s Page</title>
<div class="content">
    <h1>{display_name} <span>({username})</span></h1>
    <h2>About Me</h2>
    <p>{about}</p>
    <h2>My Page</h2>
    <div class="page-content">{@html pageHtml}</div>
    <h2>Links</h2>
    <div class="links">
        <ul>
        {#each links! as link}
            {@const href = /[\w.+-]+@[\w.-]+/.test(link) ? `mailto:${link}` : link}
            <li><a href={href} target="_blank" rel="noopener noreferrer">{link}</a></li>
        {/each}
        </ul>
    </div>
</div>

<style>
    div.content {
        width: 50vw;
        min-width: 300px;
        margin: auto;
    }
    .page-content {
        border: 1px solid #ccc;
        padding: 1em;
    }
    .links {
        margin-top: 1em;

    }
</style>