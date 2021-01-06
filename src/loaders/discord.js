const config = require('../config')
const c_manager = require('../services/command_manager')

module.exports = ({ client }) => {
  client.on('ready', () => {
    console.log("-- sound_bot is online --")
  })


  client.on('message', message => {
    if (message.author != '712929072396763146') {
      try {

        if (message.content.startsWith(`${config.prefix}`)) {
          console.log(`-- command [${message.content.split(' ')[0]}] requested by <${message.author.username}@${message.author.id}> --`)
          let command = message.content.split('.')[1].split(' ')[0]
          let args = message.content.split(/[ ]+/).slice(1)

          c_manager.run_command(message, command, args)
        }
        else {
          c_manager.play(message)
        }

      }
      catch (err) { }
    }
  })
}
