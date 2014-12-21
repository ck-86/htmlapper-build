var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('./cors.js');
var shell = require('./shell.js');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/public'));
app.use('/files', express.static(__dirname + '/uploads'));

//Cross origin resource sharing
app.use(cors);


/**************************************
 * Multer Middleware
 ***************************************
 *
 */
app.use(multer({
    dest: './uploads/',
    rename: function(fieldname, filename) {
        return filename + Date.now();
    },
    onFileUploadStart: function(file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function(file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done = true;
    }
}));

app.post('/upload', function(req, res) {
    var data = req.body;
    data.appFile = req.files.upload;
    data = JSON.stringify(data);
    console.log(data);

    if (data) {
        // this will execute 
        // statements in shell.js
        shell.execute();
    }

    res.send(req.files);
});

app.listen(8080, function() {
    console.log('Server on port : ', 8080);
});
