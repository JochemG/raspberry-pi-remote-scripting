module.exports.layout = (body, script, style) => `
<html lang="gb">
<script>${script}</script>
<style rel="stylesheet" type="text/css">${style}</style>
<body>
${body}
</body>
</html>`;