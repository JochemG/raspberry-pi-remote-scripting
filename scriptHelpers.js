const fs = require("./fsNoError");
const path = require("path");
const gpio = require("rpi-gpio");
let activeLogFile;
let logPerFileCounter = 0;

fs.mkdirSync('./logs');

module.exports = (scriptName) => ({
    log: (message) => {
        logPerFileCounter++;
        if (!activeLogFile) {
            activeLogFile = Date.now();
        }
        const logEntry = ["\r\n", scriptName, Date.now(), message].join("------");
        const logPath = path.join(__dirname, "logs", activeLogFile + ".log");

        fs.appendFileSync(logPath, logEntry);
    },
    gpio: () => {
        return gpio;
    },
    getActiveLogFile: () => activeLogFile
});