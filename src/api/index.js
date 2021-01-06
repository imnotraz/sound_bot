const { Router } = require('express')
const sound = require('./routes/sound')

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  sound(app)

  return app
}
