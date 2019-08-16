<script>
    import { createEventDispatcher } from 'svelte';
    export let code = "";
    export let className = "";

    const dispatch = createEventDispatcher();
    $: dispatch('change', { code });
    const RESERVED_KEYWORDS = /(const|let|var|function|if|else|async|await)/g;
    $: syntaxedCode = code
            .replace(RESERVED_KEYWORDS, '<span class="reserved">$1</span>');
</script>

<style>
    code {
        position: relative;
        display: block;
        border: 1px solid gray;
        box-sizing: border-box;
        background-color: #FCFCFC;
        overflow: auto;
    }

    code .input, code .output {
        padding: 0;
        margin: 0;
        font-family: monospace;
        font-size: 13px;
        border: 0;
        position: absolute;
        top: 0;
        left: 0;
        outline: none;
        min-width: 100%;
        min-height: 100%;
        height: auto;
        width: auto;
        overflow: hidden;
        display: block;
    }

    code > .output {
        color: black;
    }

    .output > :global(.reserved) {
        color: #b500d4;
        font-weight: bold;
    }

    .output > :global(.values) {
        color: #e28802;
        font-weight: bold;
    }

    code > .input {
        color: transparent;
        background-color: transparent;
        caret-color: black;
        resize: none;
    }
</style>

<code class="{className}">
    <pre class="output">{@html syntaxedCode}</pre>
    <textarea class="input" bind:value="{code}"></textarea>
</code>