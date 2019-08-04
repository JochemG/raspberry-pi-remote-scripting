const http = require('http');
const path = require('path');
const fs = require('fs');
const { viewEditScript } = require('./templates/viewEditScript');
const { listScripts } = require('./templates/listScripts');
const { listLogs } = require('./templates/listLogs');
const scriptLifecycle = require('./scriptLifecycle');
const scriptHelpers = require('./scriptHelpers');

const {getActiveLogFile, log} = scriptHelpers('///index///');

global.rootDir = __dirname;

function handleGUI(req, res) {
    if (req.url === '/scripts') {
        listScripts(req, res);
    }
    else if (req.url.startsWith('/logs')) {
        listLogs(req, res);
    }
    else if (req.url.startsWith('/execute/scripts')) {
        const file = path.join(__dirname, req.url.replace('/execute', ''));
        scriptLifecycle.setActiveScript(file);
        log('Executing ' + file);
        res.writeHead(302, {'Location': '/logs/' + getActiveLogFile()});
        res.end();
    }
    else if (req.url.startsWith('/scripts')) {
        viewEditScript(req, res);
    }
    else {
        res.end('404');
    }
}

function handleSaveFile(req, res) {
    if (req.url.startsWith('/scripts/')) {
        const fileContent = req.body;
        fs.writeFileSync(path.join(__dirname, req.url), fileContent);
        viewEditScript(req, res, fileContent);
    }
    else {
        res.end('404');
    }
}

function bodyParser(req, res, next) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        req.body = body;
        next(req, res);
    });
}

const mapMethodToFunction = {
    GET: handleGUI,
    PUT: (req, res) => bodyParser(req, res, handleSaveFile)
};

http.createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`);
    const handler = mapMethodToFunction[req.method];
    if (handler) {
        handler(req, res);
    }
}).listen(9000);

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

console.log('Server listening on port 9000');
