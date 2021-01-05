const express = require('express')
const path = require('path')
const PORT = process.env.PORT
const app = express()

var bodyParser = require('body-parser')

app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')
