<script lang="ts">
    export let data;
    const users = data.users as {
        id: number;
        username: string;
        display_name: string;
        profile_picture_url: string;
    }[];
;
</script>

<title>Users</title>
<div class="content">
    <h1>Users</h1>
    <ul>
        {#each users as user}
            <li><a href="/page/{user.username}" title={user.username}>{user.display_name}</a></li>
        {/each}
    </ul>
</div>

<style>
    div.content {
        width: 50vw;
        min-width: 300px;
        margin: auto;
    }
    ul {
        padding: 0;
        list-style: none;
    }
    li {
        font-size: 1.2rem;
    }
    li a {
        color: #3f7fff;
        text-decoration: none;
    }
    li a:hover {
        color: #1f5fdf;
        text-decoration: underline;
    }
</style>