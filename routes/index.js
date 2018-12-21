var express = require('express');
var router = express.Router();
var usersmodel = require('../modules/userModel');
const binance = require('node-binance-api')().options({
  APIKEY: 'bypq2Pq0E2mGtnpeJGUZUwwkFcBRU1stWkPuPDxPeMIVnyU2ZgiNvyfojkZa4UoL',
  APISECRET: 'NFR3iYTCO1WwoZRH7F9ko6ppIO0hHbajRsMFBGljICgbfYPeWiLltqlVlY6Y4RRm',
  useServerTime: true,
  test: true 
})

const fs = require('fs')

const data = require('./marketdata.json')

var talib = require('talib')

/* GET home page. */
router.get('/', function(req, res, next) {
var title = 'Express'
var title1= 'InfluxDB'

  res.render('index', { title: title, title1: title1, result: '' });

});

router.get('/display', function(req, res, next) {
var title = 'Express'
var title1= 'InfluxDB'

  usersmodel.displayData('coinPrices','price','98', function(result){
    console.log(result)
    // res.render('index', { title: 'loading....', title1: result, result:result });
  })
  

});

router.get('/displayBinance', function(req, res, next) {

  usersmodel.BinancedisplayData('binanceCoinPair', function(result){
    // console.log(result[0])
    res.render('index', { title: 'loading....', result: result });
  })
  

});

router.get('/insert', function(req, res, next) {
var title = 'Express'
var title1= 'InfluxDB'

   usersmodel.insertData('coinPrices','express_crypto_db',98, function(result){
     res.render('index', { title: result, title1: '', result: '' });
   })

});
router.get('/talib', function(req, res, next) {


  var marketData = data

  talib.execute({
    name: "SMA",
    startIdx: 0,
    endIdx: marketData.close.length - 1,
    high: marketData.high,
    low: marketData.low,
    close: marketData.close,
    optInTimePeriod: 9
}, function (err, result) {

    // Show the result array
    console.log("SMA Function Results:");
    res.send(result)

});

});



router.get('/binance', function(req, res, next) {
  
  binance.prices( (error, ticker) => {
   

    for(key in ticker){
   
       usersmodel.BinanceinsertData('binanceCoinPair','express_crypto_db',ticker[key], key)

    }
    res.render('index', { title: 'API HITTED', title1: '' , result: ''});
  });

});
router.get('/candleStickData', function(req, res, next) {
  
  binance.candlesticks("BNBBTC", "5m", (error, ticks, symbol) => {
    let last_tick = ticks[ticks.length - 1];
    let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
    let highArray = []
    let closeArray = []
    let lowArray = []

      for(i=0;i<ticks.length;i++)
      {
        highArray.push(ticks[i][2])
      }
      for(i=0;i<ticks.length;i++)
      {
        closeArray.push(ticks[i][4])
      }
      for(i=0;i<ticks.length;i++)
      {
        lowArray.push(ticks[i][3])
      }
 
     
  talib.execute({
    name: "ADX",
    startIdx: 0,
    endIdx: closeArray.length - 1,
    high: highArray,
    low: lowArray,
    close: closeArray,
    optInTimePeriod: 9
}, function (err, result) {

    // Show the result array
    console.log("SMA Function Results:");
    console.log(result)
    res.send(result)

});

  }, {limit: 5, endTime: 1514764800000});


});

module.exports = router;
