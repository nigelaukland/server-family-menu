const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'recipes.json'
);

const getRecipesFromFile = cb => {
  fs.readFile(p, (err, data) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }    
  });
};

module.exports = class Recipe {

  constructor(name, description, imagePath) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;  
  }

  addRecipe() {
      fs.writeFileSync(p, JSON.stringify(this), (err) => {
      console.log(err);
    });
  }

  static getAllRecipes(cb) {
    getRecipesFromFile(cb);
  }
}