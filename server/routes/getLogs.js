const fs = require("../helpers/fsNoError");
const path = require("path");

module.exports = (req, res) => {
    const files = fs.readdirSync(path.join(global.rootDir, "logs"));
    res.send(files);
};