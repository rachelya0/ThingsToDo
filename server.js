const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const http = require("http");
const fs = require("fs");
const path = require("path");
const helpers = require("./helpers");

const app = express();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/temp');
  },
});

const upload = multer({
  storage: storage,
  fileFilter: helpers.imageFilter
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + "/public"));

app.post("/upload", upload.single("uploaded-pic"), function(req, res) {
  const oldPath = req.file.path;
  const newPath = path.join(__dirname, "./uploads/image.png");

  fs.rename(oldPath, newPath, function(error) {
    if (error) {
      return handleError(error, res);
    }
  });
  res.redirect("/");
  //res.sendFile(`${__dirname}/uploads/${req.file.filename}`)
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.get("/image.png", function(req, res) {
  res.sendFile(path.join(__dirname, "./uploads/image.png"));
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
