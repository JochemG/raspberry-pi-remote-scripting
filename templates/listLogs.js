const {layout} = require("./components/layout");

const fs = require("../fsNoError");
const path = require("path");

const logItem = (logDate, children) => `<div><div>${logDate}</div>${children}</div>`;

const htmlViewLogs = (logsHref) => `<a href="${logsHref}">View logs</a>`;

const htmlLogContent = (content) => `<div>${content.replace(/\n/g, "<br />")}</div>`;

module.exports.listLogs = (req, res) => {
    const { rootDir } = global;
    const files = fs.readdirSync(path.join(rootDir, "logs"));
    const activeLogFile = req.url.replace("/logs/", "") + ".log";
    const logPath = path.join(rootDir, req.url + ".log");
    const activeLogFileContent = fs.readFileSync(logPath).toString();
    res.end(
        layout(
            files.map((fileName) => {
                const fileNameWithoutExtension = fileName.replace(".log", "");
                return logItem(
                    fileNameWithoutExtension,
                    fileName === activeLogFile ?
                        htmlLogContent(activeLogFileContent) :
                        htmlViewLogs("/logs/" + fileNameWithoutExtension)
                );
            }).join("")
        )
    );
};
