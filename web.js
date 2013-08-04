var express = require('express');
var fs = require('fs');
var api_key = 'sk_test_AdiVCMgrDSynAgkxnpC8Tjqw';  // test private_key
var stripe = require('stripe')(api_key);

var page = fs.readFileSync('index.html','utf8');
var app = express.createServer(express.logger());
//must be here 
app.use(express.bodyParser());


app.get('/', function(request, response) {
  response.send(page);
});



app.post('/', function(request, response) {  
  var token = request.param('stripeToken',null); // second parameter is default
  //as an alt to request.param, you can ref the params directly like this: request.body.stripeToken
  console.log("token: "+ token);
  
  stripe.charges.create(
     { amount: '0050',
       currency: 'usd',
       card: token},
     function(err, customer) {
        if (err) {
          console.log(err.message);
          return;
        }
        //success
        console.log("customer id: ", customer.id);
        response.send("It worked");   
     }
   );
});


var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
