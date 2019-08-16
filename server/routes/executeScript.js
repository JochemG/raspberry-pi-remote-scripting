const path = require("path");

const scriptHelpers = require('../helpers/scriptHelpers');
const scriptLifecycle = require('../helpers/scriptLifecycle');

const {log} = scriptHelpers('///executeScript///');

module.exports = (req, res) => {
    const file = path.join(global.rootDir, 'scripts', req.params.scriptName);
    log('File: ' + file);
    scriptLifecycle.setActiveScript(file);
    res.end();
};