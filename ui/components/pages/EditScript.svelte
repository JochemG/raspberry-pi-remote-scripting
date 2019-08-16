<script>
    import CodeEditor from "../common/CodeEditor.svelte";

    export let scriptId = "";
    export let scriptProgress = {};
    import Api from "../common/Api.svelte";
    import Button from "../common/Button.svelte";

    let modifiedScript = null;
    $: scriptContent = modifiedScript !== null ? modifiedScript : scriptProgress.payload || "";
    function save() {
        if (!modifiedScript) {
            alert('No changes detected');
            return;
        }
        fetch('/api/script/' + scriptId, {
            method: 'PUT',
            body: modifiedScript
        });
    }
    function execute() {
        fetch('/api/script/execute/' + scriptId, {
            method: 'GET'
        });
    }
    function saveAndExecute() {
        fetch('/api/script/save/execute/' + scriptId, {
            method: 'PUT',
            body: modifiedScript
        });
    }
    function stop() {
        fetch('/api/scripts/stop', {
            method: 'GET'
        });
    }

</script>

<style>
    :global(.editor) {
        width: 100vw;
        height: calc(100% - 200px);
    }
</style>

<Api url={'/api/script/' + scriptId} responseType="text" on:progress="{(progress) => scriptProgress = progress.detail}">
    <CodeEditor code={scriptContent} className="editor" on:change="{({detail}) => modifiedScript = detail.code}"></CodeEditor>
    <Button onClick={save}>Save</Button>
    <Button onClick={execute}>Execute</Button>
    <Button onClick={saveAndExecute}>Save and execute</Button>
    <Button onClick={stop}>Stop</Button>
</Api>