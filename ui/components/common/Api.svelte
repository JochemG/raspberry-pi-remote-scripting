<script>
    import { onMount } from "svelte";
    import { PROGRESS } from "../../constants/API";
    import { createEventDispatcher } from 'svelte';
    export let url = "/";
    export let method = "get";
    export let responseType = 'json';
    let payload = null;
    let statusCode = 0;
    const dispatch = createEventDispatcher();
    $: progress = statusCode === 0 ?
        PROGRESS.STARTED :
        statusCode < 400 ?
            PROGRESS.SUCCESS :
            PROGRESS.FAILED;
    $: showLoading = progress === PROGRESS.STARTED;
    $: dispatch('progress', {progress, payload, statusCode});
    onMount(async function() {
        const response = await fetch(url);
        payload = await response[responseType]();
        statusCode = response.status;
    });
</script>

{#if showLoading}
    <p>Loading...</p>
{:else}
    <slot {payload} {progress} {statusCode}/>
{/if}