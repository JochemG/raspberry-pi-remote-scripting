<script>
    import * as svelteRouting from "svelte-routing";
    const {Router, Link, Route} = svelteRouting;
    import ListLogs from "./pages/ListLogs.svelte";
    import ViewLog from "./pages/ViewLog.svelte";
    import ListScripts from "./pages/ListScripts.svelte";
    import EditScript from "./pages/EditScript.svelte";

    let name = "world";
    export let url = "";
</script>

<Router url="{url}">
    <Route path="logs" component="{ListLogs}"/>
    <Route path="log/:logFileName" let:params>
        <ViewLog logFileName="{params.logFileName}"/>
    </Route>

    <Route path="scripts" component="{ListScripts}"/>
    <Route path="script/:scriptId" let:params>
        <EditScript scriptId="{params.scriptId}"/>
    </Route>
    <Route path="/">
        <ListScripts/>
    </Route>
</Router>