module.exports.layout = (body, script, style) => `
<html lang="gb">
<script>${script}</script>
<style rel="stylesheet" type="text/css">
textarea {
    width: 100%;
    height: calc(100% - 200px);
}
</style>
<style rel="stylesheet" type="text/css">${style}</style>
<body>
${body}
</body>
</html>`;