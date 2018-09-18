var express = require('express')
    request = require('request-promise-native')
    bodyParser = require('body-parser')
    async = require('async');
    cors = require('cors');

var app = express()
var port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

accountRouter = express.Router();

accountRouter.route('/account/:id').
    get(function(req,res) {

    var banking_url = (process.env.BACKEND_BANKING_URL || 'http://localhost:8083') + '/account/' + req.params.id;
    var investments_url = (process.env.BACKEND_INVESTMENTS_URL || 'http://localhost:8081') + '/account/' + req.params.id;
    var linesofcredit_url = (process.env.BACKEND_LINESOFCREDIT_URL ||'http://localhost:8082') + '/account/' + req.params.id;
    var accounts = new Object();

    console.log("banking_url: " + banking_url);
    console.log("investments_url: " + investments_url);
    console.log("linesofcredit_url: " + linesofcredit_url);

    async.parallel([
        function(next) {
            request.get(banking_url, function(error, response, body) {
                accounts.checking = JSON.parse(body);
                next();
            });
        },
        function(next) {
            request.get(investments_url, function(error, response, body) {
                accounts.investments = JSON.parse(body);
                next();
            });
        },
        function(next) {
            request.get(linesofcredit_url, function(error, response, body) {
                accounts.lines_of_credit = JSON.parse(body);
                next();
            });
        }], function(err) {

        res.json(accounts);
    });

});

app.use('/api', accountRouter);

app.listen(port, function () {
    console.log('Running on port ' + port);
});

module.exports = app;