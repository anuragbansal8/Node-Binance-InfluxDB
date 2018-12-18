const Influx = require('influx')

const conn = new Influx.InfluxDB({
    host: 'localhost',
    database: 'express_crypto_db',
    schema: [
      {
        measurement: 'cryptoPrices',
        fields: {
          price: Influx.FieldType.STRING
        },
        tags: [
          'coins'
        ]
      }
    ]
   })

  conn.getDatabaseNames()
  .then(names => {
    if (!names.includes('cryptoDb')) {
      return conn.createDatabase('cryptoDb');
    }
  })
  .then(() => {
            console.log('Connection done!!')
  })
  .catch(error => console.log({ error }));

  module.exports=conn