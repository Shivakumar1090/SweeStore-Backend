const short = require("short-uuid");
const multer = require("multer");
const path = require("path");

const upload = (storageEngine) =>
  multer({
    storage: storageEngine,
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const mime = file.mimetype;
      const regex = /png|gif|jpg|jpeg|pdf/;
      if (!(ext.match(regex) && mime.match(regex)))
        cb(new Error("Invalid Image"), false);
      cb(null, true);
    },
  });

const storageEngine = (destination) =>
  multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
      const uid = short.generate();
      const filename = `${uid}-${Date.now()}${path
        .extname(file.originalname)
        .toLowerCase()}`;
      cb(null, filename);
    },
});

module.exports = { upload, storageEngine};
