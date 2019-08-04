const fs = require('fs');
const path = require('path');
const html = `
<html>
<head>
<script>

</script>
</head>
<body>
{body}
</body>
</html>
`;

module.exports.viewLogs = (req, res, activeLogFile) => {
    fs.readFil
    res.end(html.replace('{body}', fileContent));
};
