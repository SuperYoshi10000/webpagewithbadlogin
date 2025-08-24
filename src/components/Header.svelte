<script lang="ts">
  import { onMount } from "svelte";
  import NavItem from "./NavItem.svelte";

    let logout: NavItem, signup: NavItem, login: NavItem;
    onMount(() => {
        if (document.cookie.includes("session_id")) {
            logout.hidden = false;
            signup.hidden = true;
            login.hidden = true;
        }
    })
</script>

<header>
    <nav>
        <NavItem important>My Website</NavItem>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/logout" hidden bind:this={logout}>Log Out</NavItem>
        <NavItem href="/signup" bind:this={signup}>Sign Up</NavItem>
        <NavItem href="/login" bind:this={login}>Log In</NavItem>
    </nav>
</header>

<style>
    nav {
        background-color: #f0f0f0;
    }
</style>