const db = require('../db')
const sound = require('./commands/sound')
const player = require('./commands/player')
const setting = require('./commands/setting')


exports.run_command = (message, command_name, args) => {

    let found = false
    for(let s in sound) {
        if(sound[s].command == command_name) {
            found = true
            run(message, args, sound[s])
        }
    }
    if(!found) {
        for(let p in player) {
            if(player[p].command == command_name) {
                found = true
                run(message, args, player[p])
            }
        }
        if(!found)
            for(let g in setting) {
                if(setting[g].command == command_name) {
                    found = true
                    run(message, args, setting[g])
                }
            }
    }

}

exports.play = (message) => {
    let sound = message.content.toLowerCase()
    if(message.guild.voice.connection.status == 0) {
        db.get_sound(sound, (url, find) => {
            if(find) {
                dispatcher = message.guild.voice.connection.play(url)
                console.log(`-- sound [${sound}] requested --`)
            }
        })
    }
}

function run(message, args, options) {
    let c = {
        command,
        description,
        expected_args,
        attachment = false,
        role,
        callback

    } = options

    validate(c, args, message, validated => {
        if(validated) callback(message, args)
        else message.reply(`Missing arg ${c.expected_args} or no permission for this command.`)
    })
}

function validate(c, args, message, callback) {

    let args_validate = true
    let role_validate = true

    if(c.expected_args) {
        if(!c.expected_args.startsWith('?')) {
            if(c.expected_args && args[0]) args_validate = true
            else  args_validate = false
        }
        else if((c.attachment && !message.attachments.first()))
            args_valida = false
    }


    if(c.role && !args_validate) {
        role_validate = false
        message.member.roles.cache.forEach(r => {
            if(r.name == c.role) role_validate = true
        })
    }

    
  
    if(args_validate && role_validate) callback(true)
    else callback(false)
}