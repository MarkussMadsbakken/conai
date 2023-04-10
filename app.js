var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require("path");
var util = require('util')

var port = 3000
var express = require('express');
var app = express();

var sharp = require('sharp'); //image processing
var multer = require('multer'); //file upload


//starte server
app.listen(port)
console.log("server started: http://localhost:"+port)

//css
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });



