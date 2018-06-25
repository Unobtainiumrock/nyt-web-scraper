
const fs = require('fs');
const path = require('path');
const basename  = path.basename(module.filename);
const db = {};

// Might need to add some stuff for db configuration in here.. It makes sense to have 
// db logic closely tied to models like it was shown in the generated sequelize config file.

// Need a key equal to the model Name and a value associated with the 
// key equal to a require(./path to ) 
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const modelName = file.slice(0,-3);
    db[modelName] = require(`./${modelName}`);
  });
  // console.log(Object.keys(db));
  // console.log(Object.values(db));
module.exports = db;
