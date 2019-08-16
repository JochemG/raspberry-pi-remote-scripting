const path = require("path");

const scriptHelpers = require('../helpers/scriptHelpers');
const scriptLifecycle = require('../helpers/scriptLifecycle');

const {log} = scriptHelpers('///stopScripts///');

module.exports = (req, res) => {
    scriptLifecycle.stop();
    log('Stopped all scripts');
    res.end();
};