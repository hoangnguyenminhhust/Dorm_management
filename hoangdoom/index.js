var express = require('express');
bodyParser = require('body-parser');
mongoose = require('mongoose');
app = express();
port = process.env.PORT || 3333;

user = require('./api/model/user'); //created model loading here

app.use(express.static('view'));

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/doomnode');

app.get("/homepage", (req, res) => {
    res.sendFile(__dirname + "/view/html/HomepageAministrator.html");
})

app.get("/studentinfo", (req, res) => {
    res.sendFile(__dirname + "/view/html/page.html");
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/mainroutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('Doom manager server started on: ' + port);