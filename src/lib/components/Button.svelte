<script lang="ts">
    import { page } from '$app/state';
    
    import type * as style from '$lib/style';

    export let href: string | null = null;
    export let action: ((event: MouseEvent) => void) | null = null;
    export let hidden: boolean = false;
    export let float: style.float = "none";
    export let nav: boolean = false;

</script>

<a class="button" href={href} hidden={hidden} style:float={float} data-current={(page.url.pathname === href && nav) || undefined} on:click={action}>
    <slot/>
</a>

<style>
    a.button {
        background-color: #e0e0e0;
        padding: 0.5rem;
        min-width: 100px;
        text-align: center;
        flex-direction: column;
        align-content: center;
        transition: 0.3s;
        text-decoration-line: none;
        color: black;
        border-bottom: 4px solid transparent;
        cursor: pointer;
        display: inline-block;
        border-radius: 10px;
    }
    a.button:is(:global(nav > *)) {
        height: 2em;
        font-size: 1.2rem;
    }
    a.button:not(:global(nav > *)) {
        height: 1.25em;
        font-size: 1rem;
        margin: 0.25em auto;
    }

    a.button:hover {
        background-color: #d0d0d0;
    }
    a.button[data-current] {
        /* background-color: #c0c0c0; */
        font-weight: bold;
        border-bottom-color: black;
    } 
</style>