<script>
    import { link } from "svelte-routing";
    const {Router, Link, Route} = svelteRouting;
    import Api from "../common/Api.svelte";
    let arr = [1, 2, 3];
</script>
<style>
    a {
        display: block;
    }
</style>

<Api url={'/api/logs'} let:payload let:progress>
    {#each payload as log}
        <a href="/log/{log}" use:link>{log}</a>
    {/each}
</Api>