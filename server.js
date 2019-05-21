var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var database = [];

app.use(express.static(path.join(__dirname, './build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './build', 'index.html'));
})

// app.post('/data', (req,res) => {
//     var body = req.body
    
//     database.append(body);

//     res.json(database);
//     console.log(database);
// })

var port = 3000;
server = app.listen(port , () => console.log('Listening on port ' + port))