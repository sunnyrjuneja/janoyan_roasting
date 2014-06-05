var fs = require('fs');
var path = require('path');
var dir = './site/coffees/';
var output = './site/coffees/inventory.json'
var inventory = [];

if (fs.existsSync(output)) {
  console.log("File name already exists,updating");
  fs.unlink(output, function (err) {
    if (err) console.log(err);
  });
}

fs.readdir(dir, function(err, files){
  if (err) throw err;
  var readFiles = function(index) {
    if (index == files.length) {
      fs.writeFile(output, JSON.stringify(inventory), function(err) {
        if(err) console.log(err);
        else console.log(JSON.stringify(inventory)), console.log("Completed.");
      });
    } else {
      fs.readFile(dir + files[index], 'utf-8', function(err, contents) {
        if (err) throw err;
        else if (path.extname(dir + files[index]) == ".json") { 
          inventory.push(contents);
        }
        readFiles(index + 1);
      });
    }
  }
  readFiles(0);
});

