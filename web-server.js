var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/dist'));
app.use('/payment/', express.static(__dirname + '/dist'));
app.use('/payment/sepa/', express.static(__dirname + '/dist'));
app.use('/payment/dd', express.static(__dirname + '/dist'));
app.listen(8081, function() { console.log('listening'); });