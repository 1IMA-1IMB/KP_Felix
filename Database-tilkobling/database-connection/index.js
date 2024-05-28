const express = require('express')
const app = express()
var mysql = require('mysql');
var cors = require('cors')

require('dotenv').config()

const port = process.env.PORT

app.use(cors())

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.PASSWORD,
  database: 'felixbor_hei'
});


connection.connect(function(err) {

  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

app.get('/getallstudents', (req, res) => {
  connection.query('SELECT * FROM `elev`', function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results))

  });
})  

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})



// app.get('/', (request, response) => {
//     if (error) throw error;
//     response.send(JSON.stringify('Hello World'))
// })

// app.get('/getallstudents', (request, response) => {

//   connection.query('SELECT * FROM elev', function (error, results, fields) {
//     if (error) throw error;
//     response.send(JSON.stringify(results));
//   });
// })

