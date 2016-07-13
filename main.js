var menubar = require('menubar');
const path = require('path');
const dirname = __dirname || path.resolve(path.dirname());
const emberAppLocation = `file://${dirname}/dist/index.html`;
const iconLocation = `${dirname}/dist/assets/img/IconTemplate.png`;

var mb = menubar({index:emberAppLocation, icon: iconLocation});

mb.on('ready', function ready () {

  console.log('Huello is ready.');
});
