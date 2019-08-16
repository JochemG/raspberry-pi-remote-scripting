
global.rootDir = __dirname;
const {expressApp} = require("./expressApp");
const scriptHelpers = require('./helpers/scriptHelpers');

const {log} = scriptHelpers('///index///');


expressApp.listen(9000);

console.log("Server listening on port 9000");


function logError(error) {
    if (error.message && error.stack) {
        log([error.message, error.stack].join('======'))
    }
    else {
        log(error);
    }
}
process.on('unhandledRejection', logError);
process.on('uncaughtException', logError);
