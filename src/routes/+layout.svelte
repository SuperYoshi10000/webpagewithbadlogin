<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import Header from '../components/Header.svelte';

    let { children } = $props();

    let date = new Date();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Header />
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
</style>