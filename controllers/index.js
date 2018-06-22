
const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const routePaths = [];

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(function(file) {
    routePaths.push(path.join(__dirname,file));
  });

// console.log(routePaths);

module.exports = routePaths;