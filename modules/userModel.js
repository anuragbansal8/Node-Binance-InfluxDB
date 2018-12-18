var conn=require('./conn')

insertData = (measurement, database, price,cb) => {

    conn.writePoints([
        {
            measurement: measurement,
            fields: {
                price: price+''
            },
            tags:{
                coin: price+2
            }
        }
    ],{
        database: database
    })
    .then(()=>{
        cb('Successfully Inserted data')
    })
    .catch(error=>{
        console.error(`Error saving data to InfluxDB! ${error.stack}`)
    })
}
BinanceinsertData = (measurement, database, price, name) => {

    conn.writePoints([
        {
            measurement: measurement,
            fields: {
                price: price+''
            },
            tags:{
                name: name+''
            }
        }
    ],{
        database: database
    })
    .then(()=>{
        console.log('Successfully Inserted data')
    })
    .catch(error=>{
        console.error(`Error saving data to InfluxDB! ${error.stack}`)
    })
}

displayData = (measurement, field, price, cb) =>{

    conn.query(`
    select * from ${measurement}
  `)
  .then( rows => {
    rows.forEach(row => cb(`price is ${row.price} and coin is ${row.coin}`))
  }  )
  .catch( error => response.status(500).json({ error }) );

}

BinancedisplayData = (measurement, cb) =>{
    conn.query(`
    select * from ${measurement}
  `)
  .then( rows => {
      cb(rows)
  })
  .catch( error => response.status(500).json({ error }) );

}

module.exports={insertData:insertData,displayData:displayData, BinanceinsertData:BinanceinsertData, BinancedisplayData:BinancedisplayData}