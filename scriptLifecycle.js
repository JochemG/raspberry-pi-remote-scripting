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