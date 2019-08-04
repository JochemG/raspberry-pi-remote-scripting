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
    window.location.pathname = '/execute' + window.location.pathname;
}`;

const edit = (fileContent) => `
<textarea>
${fileContent}
</textarea>
<button onclick="execute()">Execute</button>
<button onclick="save()">Save</button>`;

module.exports.viewEditScript = (req, res) => {
    const {rootDir} = global;
    const fileContent = fs.readFileSync(path.join(rootDir, req.url));
    res.end(layout(edit(fileContent), script()));
};
