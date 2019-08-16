const fs = require("../helpers/fsNoError");
const path = require("path");

module.exports = (req, res) => {
    const fileContent = fs.readFileSync(path.join(global.rootDir, 'scripts',  req.params.scriptName));
    res.type('text/javascript');
    res.send(fileContent.toString());
};