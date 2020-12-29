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
    let {
        command,
        description,
        expected_args = '',
        attachment = false,
        role,
        callback

    } = options

    let role_validate = false
    if(role) {
        message.member.roles.cache.forEach(r => {
            if(r.name == role) {
                role_validate = true
            }
        })
    }
    else role_validate = true
    
    if((attachment && !message.attachments.first()) || !role_validate) return
    callback(message, args)

}   
