const fs = require("../helpers/fsNoError");
const path = require("path");

module.exports = (req, res) => {
    const fileContent = req.body;
    fs.writeFileSync(path.join(global.rootDir, 'scripts', req.params.scriptName), fileContent);
    res.status(204).send();
};