<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import Header from '$lib/components/Header.svelte';

    export let data;

    export let children;
    
    let date = new Date();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Header data={data}/>
<main>
    {@render children?.()}
</main>
<footer style="">
    <p>&copy; {date.getFullYear()}</p>
</footer>

<style>
    :global(body, body > div) {
        margin: 0;
        min-height: 100vh;
    }
    main {
        height: calc(100vh - 8.75rem);
    }
    footer {
        position: sticky;
        bottom: 0;
        width: calc(100% - 2rem);
        height: 2rem;
        padding: 0 1rem;
    }
    :global(*) {
        font-family: Roboto, sans-serif;
    }
</style>