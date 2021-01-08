const config = require('../../config')
const db = require('../db')
const sound = require('./commands/sound')
const player = require('./commands/player')
const setting = require('./commands/setting')

const commandGroups = [sound, player, setting]

class CommandManager {

    constructor(client) {
        client.on('message', message => {
            if (message.author.tag !== client.user.tag) {
                try {
                    if (message.content.startsWith(`${config.prefix}`)) {
                        console.log(`-- command [${message.content.split(' ')[0]}] requested by <${message.author.username}@${message.author.id}> --`)
                        let command = message.content.split(config.prefix)[1].split(' ')[0]
                        let args = message.content.split(/[ ]+/).slice(1)

                        this.runCommand(message, command, args)
                    }
                    else {
                        this.play(message)
                    }
                }
                catch (err) { }
            }
        })
    }

    runCommand = (message, command_name, args) => {
        for (let group of commandGroups) {
            for (let command of Object.values(group)) {
                if (command.command === command_name) {
                    run(message, args, command)
                    break
                }
            }
        }
    }

    play = (message) => {
        let sound = message.content.toLowerCase()
        if (message.guild.voice.connection.status == 0) {
            db.get_sound(sound, (url, find) => {
                if (find) {
                    const dispatcher = message.guild.voice.connection.play(url)
                    console.log(`-- sound [${sound}] requested --`)
                }
            })
        }
    }

    run(message, args, options) {
        let c = {
            command,
            description,
            expected_args,
            attachment = false,
            role,
            callback

        } = options

        validate(c, args, message, validated => {
            if (validated) callback(message, args)
            else message.reply(`Missing arg ${c.expected_args} or no permission for this command.`)
        })
    }

    validate(c, args, message, callback) {

        let args_validate = true
        let role_validate = true

        if (c.expected_args) {
            if (!c.expected_args.startsWith('?')) {
                if (c.expected_args && args[0]) args_validate = true
                else args_validate = false
            }
            else if ((c.attachment && !message.attachments.first()))
                args_valida = false
        }


        if (c.role && !args_validate) {
            role_validate = false
            message.member.roles.cache.forEach(r => {
                if (r.name == c.role) role_validate = true
            })
        }



        if (args_validate && role_validate) callback(true)
        else callback(false)
    }

}

module.exports = CommandManager
