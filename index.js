const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(__dirname));

app.get("/questions", function (req, res) {
  res.sendFile(__dirname + "/questions.json");
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port);

console.log("Server started at " + port);
