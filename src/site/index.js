const { Router } = require('express')

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();

  app.get('/', (req, res) => {
    res.render('index.html', {
      sounds: []
    })
  })

  return app
}
