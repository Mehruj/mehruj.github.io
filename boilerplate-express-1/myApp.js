const mySecret = process.env['MESSAGE_STYLE'];
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var urlPraserencode= bodyParser.urlencoded({extended: false});
console.log('hello world');

app.use(function middleware(req, res, next) {
 
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

app.get("/", function(req, res) {
  // res.send("Hello Express");
  res.sendFile(__dirname + "/views/index.html");


});
app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "HELLO JSON";
  } else {
    response = "Hello json";
  }
  res.json({
    "message": response
  });
});
app.use(express.static(__dirname + "/public"));



app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

app.get("/name", function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  
  var { first: firstName, last: lastName } = req.query;
 
  res.json({
    name: `${firstName} ${lastName}`
  });
});

app.post("/name", function(req, res) {
 
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});


































module.exports = app;
