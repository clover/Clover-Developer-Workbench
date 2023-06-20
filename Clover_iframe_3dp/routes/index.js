var express = require('express');
var request = require('request');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/charge', function(req, res, next) {
  var data = {
    amount: req.body.amount, 
    source: req.body.source,
    currency: 'USD',
  };
  console.log(data);
  // Post a charge from merchant server to clover server with api auth token
  request.post('https://scl-sandbox.dev.clover.com/v1/charges', {
      json: data,
      headers: {
        'authorization': 'Bearer {Merchant OAuth Token}'
      }
    }, (error, response, body) => {
      if (error) {
          res.status(500).send({error: 'Failed to process the charge'});
          return;
      }
      res.send(body);
  });
});

module.exports = router;
