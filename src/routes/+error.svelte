<script>
    import { page } from '$app/state';
    const { status, error } = page;
    const { message } = error || {};
    console.log(page.error)
</script>

<title>Error {status}</title>
<h1>An error occurred</h1>
<h2>{status} - {message}</h2>
{#if status === 404}
    <p>The page was not found. It either does not exist or you may have mistyped the URL.</p>
{:else if status === 403}
    <p>You are not allowed to access this page. You may not be logged in.</p>
{:else if status > 499}
    <p>This is an error page. Something went wrong on the server.</p>
{:else if status > 399}
    <p>This is an error page. You did something wrong.</p>
{:else}
    <p>This is an error page (and a very weird one). The status code doesn't make sense, though. You should not be seeing this.</p>
{/if}
<p>If you think this is a mistake, please contact the site owner.</p>
<p><a href="/">Go back to the home page</a></p>