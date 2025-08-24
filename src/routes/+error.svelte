<script>
    import { page } from '$app/state';
    const { status, error } = page;
    const { message } = error || {};
    console.log(page.error)
</script>

<h1>An error occurred</h1>
<p>{status} - {message}</p>