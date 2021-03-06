var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();
app.set('port', (process.env.PORT || 5000));
app.use(express.static('dist'));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// app.use("/auth",require('./auth-api/auth-routes.js'));

// app.use("/fneqapi",require('./fneqapi/fneq-routes.js'));

// app.use("/api",require('./poc-api/poc-routes.js'));

// router.get('/', function(req, res) {
//     res.json({ message: 'Welcome Sparklers.' });   
// });
// REGISTER OUR ROUTES -------------------------------


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// all of our routes will be prefixed with /api
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
