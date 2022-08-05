const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.get("/contact", function(req, res) {
  res.send("Contact me at: rachelyao.ling@gmail.com");
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});
