<script>
    export let logFileName = '';
    import Api from "../common/Api.svelte";
</script>

<Api url={'/api/log/' + logFileName} responseType="text" let:payload let:progress>
    <p>{payload}</p>
</Api>