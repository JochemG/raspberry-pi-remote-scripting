const {layout} = require("./components/layout");

const fs = require("../fsNoError");
const path = require("path");

const scriptItem = (scriptName, logsHref, scriptHref, executeHref) =>
    `<div><div>${scriptName}</div><a href="${logsHref}">View logs</a><a href="${scriptHref}">View script</a><a href="${executeHref}">Execute script</a></div>`;

module.exports.listScripts = (req, res) => {
    const files = fs.readdirSync(path.join(path.dirname(require.main.filename), "scripts"));
    const resultHtml = files.map((fileName) =>
        scriptItem(
            fileName.replace(".js", ""),
            "/logs",
            "/scripts/" + fileName,
            "/execute/scripts/" + fileName
        )
    ).join("");
    res.end(layout(resultHtml));
};
