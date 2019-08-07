const {layout} = require("./components/layout");

const fs = require("../fsNoError");
const path = require("path");

const script = () => `
function save() {
    const value = document.getElementsByTagName('textarea')[0].value;
    fetch(window.location.href, {
        method: 'PUT',
        body: value
    });
}

function execute() {
    fetch('/execute' + window.location.pathname, {
        method: 'GET'
    });
}

function stopAllScripts() {
    fetch('/stop/scripts', {
        method: 'GET'
    })
}`;

const edit = (fileContent) => `
<textarea>
${fileContent}
</textarea>
<button onclick="execute()">Execute</button>
<button onclick="stopAllScripts()">Stop all scripts</button>
<button onclick="save()">Save</button>`;

module.exports.viewEditScript = (req, res) => {
    const {rootDir} = global;
    const fileContent = fs.readFileSync(path.join(rootDir, req.url));
    res.end(layout(edit(fileContent), script()));
};
