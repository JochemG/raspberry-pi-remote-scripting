const fs = require("../helpers/fsNoError");
const path = require("path");

const scriptHelpers = require('../helpers/scriptHelpers');
const scriptLifecycle = require('../helpers/scriptLifecycle');

const {log} = scriptHelpers('///saveAndExecuteScript///');

module.exports = (req, res) => {
    const fileContent = req.body;
    const file = path.join(global.rootDir, 'scripts', req.params.scriptName);
    log('File: ' + file);
    fs.writeFileSync(file, fileContent);
    scriptLifecycle.setActiveScript(file);
    res.status(204).send();
};