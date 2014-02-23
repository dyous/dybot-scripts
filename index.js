var fs = require('fs');
var path = require('path');

module.exports = function(robot) {
  fs.readdirSync(path.join(__dirname, 'scripts')).forEach(function(f) {
    var moduleName = './scripts/' + f;
    require(moduleName)(robot);
  });
};

