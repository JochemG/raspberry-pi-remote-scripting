const fs = require('fs');

function tryCatch(action, ...args) {
    try{
        return action(...args);
    }
    catch(error) {
        return false;
    }
}

module.exports = {
    readdirSync: tryCatch.bind(this, fs.readdirSync),
    readFileSync: tryCatch.bind(this, fs.readFileSync),
    mkdirSync: tryCatch.bind(this, fs.mkdirSync),
    appendFileSync: tryCatch.bind(this, fs.appendFileSync),
    writeFileSync: tryCatch.bind(this, fs.writeFileSync),
};