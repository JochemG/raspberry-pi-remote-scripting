const fs = require("../helpers/fsNoError");
const path = require("path");

module.exports = (req, res) => {
    const fileContent = fs.readFileSync(path.join(global.rootDir, 'logs',  req.params.logName));
    res.type('text/plain');
    res.send(fileContent.toString());
};