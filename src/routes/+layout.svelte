<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import Header from '../components/Header.svelte';

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
    header {
        position: relative;
        top: 0;
        width: 100%;
    }
    footer {
        position: relative;
        bottom: 0;
        width: 100%;
    }
    :global(*) {
        font-family: Roboto, sans-serif;
    }
</style>