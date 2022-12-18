const fs = require("fs");
module.exports = (path) => {
  fs.unlink(path, (err) => {
    if (err) console.log(err);
    else console.log(`file delete at ${path}`);
  });
};
