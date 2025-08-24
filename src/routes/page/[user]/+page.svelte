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

<div class="content">
    <h1>{display_name} <span>({username})</span></h1>
    <p>{about}</p>
    <div class="page-content">{@html pageHtml}</div>
    <div class="links">
        {#each links! as link}
            <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        {/each}
    </div>
</div>