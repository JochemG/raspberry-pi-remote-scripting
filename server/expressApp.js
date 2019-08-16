const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const expressApp = express();
const scriptHelpers = require('./helpers/scriptHelpers');

const {log} = scriptHelpers('///express///');

expressApp
    .use((req, res, next) => {
        log(`${req.method} ${req.url}`);
        next();
    })
    .use(bodyParser.json())
    .use(bodyParser.text())
    .use(express.static(path.join(global.rootDir, '../public')))
    .get("/api/logs", require('./routes/getLogs'))
    .get("/api/log/:logName", require('./routes/getLog'))

    .get("/api/scripts", require('./routes/getScripts'))
    .get("/api/script/:scriptName", require('./routes/getScript'))
    .put("/api/script/:scriptName", require('./routes/saveScript'))
    .put("/api/script/save/execute/:scriptName", require('./routes/saveAndExecuteScript'))
    .get("/api/script/execute/:scriptName", require('./routes/executeScript'))
    .get("/api/scripts/stop", require('./routes/stopScripts'))
    .get(/.*/, (req, res) => {
        res.sendFile(path.join(global.rootDir, '../public/index.html'));
    });

module.exports.expressApp = expressApp;