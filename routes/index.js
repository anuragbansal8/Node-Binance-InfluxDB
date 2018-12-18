var express = require('express');
var router = express.Router();
var usersmodel = require('../modules/userModel');
const binance = require('node-binance-api')().options({
  APIKEY: 'bypq2Pq0E2mGtnpeJGUZUwwkFcBRU1stWkPuPDxPeMIVnyU2ZgiNvyfojkZa4UoL',
  APISECRET: 'NFR3iYTCO1WwoZRH7F9ko6ppIO0hHbajRsMFBGljICgbfYPeWiLltqlVlY6Y4RRm',
  useServerTime: true,
  test: true 
})

/* GET home page. */
router.get('/', function(req, res, next) {
var title = 'Express'
var title1= 'InfluxDB'

  res.render('index', { title: title, title1: title1 });

});

router.get('/display', function(req, res, next) {
var title = 'Express'
var title1= 'InfluxDB'

  usersmodel.displayData('coinPrices','price','98', function(result){
    res.render('index', { title: 'loading....', title1: result });
  })
  

});

router.get('/displayBinance', function(req, res, next) {

  usersmodel.BinancedisplayData('binanceCoinPair', function(result){
    console.log(result[0])
    res.render('index', { title: 'loading....', result: result, length:result.length });
  })
  

});

router.get('/insert', function(req, res, next) {
var title = 'Express'
var title1= 'InfluxDB'

   usersmodel.insertData('coinPrices','express_crypto_db',98, function(result){
     res.render('index', { title: result, title1: '' });
   })

});



router.get('/binance', function(req, res, next) {
  
  binance.prices( (error, ticker) => {
   

    for(key in ticker){
   
       usersmodel.BinanceinsertData('binanceCoinPair','express_crypto_db',ticker[key], key)

    }
    res.render('index', { title: 'API HITTED', title1: '' });
  });

});

module.exports = router;
