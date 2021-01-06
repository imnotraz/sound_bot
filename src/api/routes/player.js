const { Router } = require('express')
const route = Router()

module.exports = (app) => {
  app.use('/player', route);

  route.post('/stop', (req, res) => {
    // commands.stop()
    console.log('Stop playing')
  })
};
