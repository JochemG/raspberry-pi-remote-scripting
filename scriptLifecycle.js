const scriptHelpers = require('./scriptHelpers');
const {getActiveScript, getActiveScriptName, setScript} = require('./globalState');

function onStart() {
    const helpers = scriptHelpers(getActiveScriptName().replace(__dirname, ''));
    try {
        if (getActiveScript() && getActiveScript().onStart) {
            getActiveScript().onStart(helpers);
        }
    }
    catch(error) {
        helpers.log(error.message + error.stack || error);
    }
}

function onStop() {
    const activeScript = getActiveScriptName() || '';
    const scriptHelper = scriptHelpers(activeScript.replace(__dirname, ''));
    if (getActiveScript() && getActiveScript().onStop) {
        getActiveScript().onStop(scriptHelper);
    }
    scriptHelper.clearEvents();
}


module.exports.setActiveScript = (newActiveScriptPath) => {
    onStop();
    delete require.cache[require.resolve(newActiveScriptPath)];
    setScript(newActiveScriptPath, require(newActiveScriptPath));
    onStart()
};

module.exports.stop = onStop;