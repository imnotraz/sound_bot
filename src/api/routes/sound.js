const { Router } = require('express')
const route = Router()

module.exports = (app) => {
  app.use('/sound', route);

  route.post('/play', (req, res) => {
    //commands.play_sound(req.body.sound.toLowerCase())
    console.log(`Play: ${req.body.sound.toLowerCase()}`)
    res.end();
  })
};
