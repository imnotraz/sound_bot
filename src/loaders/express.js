const config = require('../config')
const express = require('express')
const sassMiddleware = require('node-sass-middleware')
const bodyParser = require('body-parser')
const apiRoutes = require('../api')
const siteRoutes = require('../site')
const path = require('path')

module.exports = ({ app }) => {
  /**
   * Health Check endpoints
   */
  app.get('/status', (req, res) => {
    res.status(200).end()
  })
  app.head('/status', (req, res) => {
    res.status(200).end()
  })

  // Show the real origin IP in the heroku logs
  app.enable('trust proxy')

  // Middleware to transform req.body into json
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  // Middleware for compiling sass into css
  app.use(sassMiddleware({
    src: path.join(__dirname, '../../style'),
    dest: path.join(__dirname, '../../public'),
    outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'nested',
    debug: process.env.NODE_ENV !== 'production'
  }))

  // Import static assets
  app.use(express.static(path.join(__dirname, '../../public')))

  // Import views
  app.set('views', path.join(__dirname, '../../views'))

  // Set template engine
  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'html')

  // Load API routes
  app.use(config.api.prefix, apiRoutes())

  // Load site routes
  app.use('/', siteRoutes())

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err['status'] = 404
    next(err)
  })
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      errors: {
        message: err.message,
      },
    })
  })
}
