<script>
    import { link } from "svelte-routing";
    import Api from "../common/Api.svelte";
</script>

<Api url={'/api/scripts'} let:payload let:progress>
    {#each payload as script}
        <a href="/script/{script}" use:link>{script}</a>
    {/each}
</Api>