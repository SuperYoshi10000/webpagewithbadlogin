<script lang="ts">
    export let href: string | null = null;
    export let important: boolean = false;
    export let hidden: boolean = false;
</script>

<a href={href} data-important={important || undefined} hidden={hidden}>
    <slot/>
</a>

<style>
    a:not([hidden]) {
        display: inline-block;
        padding: 0.5em;
        min-width: 100px;
        height: 2em;
        text-align: center;
    }
    a[href] {
        background-color: gray;
    }
    a[data-important] {
        font-weight: bold;
        font-size: 1.25em;
    }
</style>