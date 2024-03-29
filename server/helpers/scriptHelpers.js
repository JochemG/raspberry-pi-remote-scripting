const fs = require("./fsNoError");
const path = require("path");
const gpio = require("rpi-gpio");
const pigpio = require("pigpio");
let activeLogFile;
let logPerFileCounter = 0;

fs.mkdirSync('./logs');

let intervalIds = [];
let timeoutIds = [];
class ScriptHelpers {
    constructor(scriptName) {
        this.scriptName = scriptName;
        this.gpio = gpio;
        this.gpiop = gpio.promise;
        this.pigpio = pigpio;
        this.log = this.log.bind(this);
        this.interval = this.interval.bind(this);
        this.timeout = this.timeout.bind(this);
        this.wait = this.wait.bind(this);
    }

    log(message) {
        logPerFileCounter++;
        if (!activeLogFile) {
            activeLogFile = Date.now();
        }
        const logEntry = [Date.now(), this.scriptName, message].join("------");
        const logPath = path.join(__dirname, "logs", activeLogFile + ".log");
        console.log(logEntry);

        fs.appendFileSync(logPath, "\r\n" + logEntry);
    }

    getActiveLogFile() {
        return activeLogFile;
    }

    interval(...setIntervalArgs) {
        const id = global.setInterval(...setIntervalArgs);
        intervalIds.push(id);
        return id;
    }

    timeout(...setTimeoutArgs) {
        const id = setTimeout(...setTimeoutArgs);
        timeoutIds.push(id);
        return id;
    }

    wait(timeout) {
        return new Promise((resolve) => {
            this.timeout(resolve, timeout);
        })
    }

    clearEvents() {
        intervalIds.forEach(clearInterval);
        timeoutIds.forEach(clearTimeout);
        intervalIds = [];
        timeoutIds = [];
    }
}


module.exports = (scriptName) => new ScriptHelpers(scriptName);