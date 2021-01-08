const config = require('../config')
const c_manager = require('../services/command_manager')

module.exports = ({ client }) => {
  client.once('ready', () => {
    console.log("-- sound_bot is online --")
  })

  const commandManager = new c_manager(client)
}
