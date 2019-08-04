

let activeScript = null;
let activeScriptName = null;

module.exports.setScript = (scriptName, script) => {
    activeScriptName = scriptName;
    activeScript = script;
};

module.exports.getActiveScript = () => activeScript;
module.exports.getActiveScriptName = () => activeScriptName;