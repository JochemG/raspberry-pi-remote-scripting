const {layout} = require("./components/layout");

const home = () =>
    `<a href="./scripts">View/create/manage scripts</a><a href="./logs">View logs</a>`;

module.exports.home = (req, res) => {
    res.end(layout(home()));
};
