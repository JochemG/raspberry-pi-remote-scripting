const scriptHelpers = require('./scriptHelpers');
const {getActiveScript, getActiveScriptName, setScript} = require('./globalState');

function onStart() {
    if (getActiveScript() && getActiveScript().onStart) {
        getActiveScript().onStart(scriptHelpers(getActiveScriptName().replace(__dirname, '')));
    }
}

function onStop() {
    if (getActiveScript() && getActiveScript().onStop) {
        getActiveScript().onStop(scriptHelpers(getActiveScriptName().replace(__dirname, '')));
    }
}


module.exports.setActiveScript = (newActiveScriptPath) => {
    onStop();
    delete require.cache[require.resolve(newActiveScriptPath)];
    setScript(newActiveScriptPath, require(newActiveScriptPath));
    onStart()
};