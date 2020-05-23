
const fs = require('fs')
const yt = require('ytdl-core')

exports.online = false
exports.connection
exports.dispatcher


exports.upload = exports.u = (message) => {
    if(message.member.roles.cache.has('466619798307209216')) { 

        let sl = message.content.split(' ')[1]
        let sn = message.content.split(' ')[2]
        let add_sound = function(name, url) {
            let new_sound = {
                name: name,
                url: url
            }
            let jsonString = fs.readFileSync('./sound.json')
                let sounds = JSON.parse(jsonString)
                let already = false
                for(let i = 0; i < sounds.sounds.length; i++){
                    if(sounds.sounds[i].name == new_sound.name) { 
                        already = true
                        break
                    }
                }
                if(!already) {
                    sounds.sounds.push(new_sound)
                    fs.writeFileSync('./sound.json', JSON.stringify(sounds))
                    message.react('✅')
                }
                else message.reply("There's already a sound with this name.")
        }

        if(message.attachments.first()){
            if(message.attachments.first().name.split('.')[1] == 'mp3') {
                if(message.attachments.first().size < 1001000) {
                    add_sound(sl.toLowerCase(), message.attachments.first().url.toLowerCase())
                }
                else message.reply('File too big.')
            }
            else message.reply('The file must be a mp3 file.')
        }
        else if((sl.startsWith('http://') || sl.startsWith('https://')) && sl.endsWith('.mp3')) {
            if(sn) {
                add_sound(sn.toLowerCase(), sl.toLowerCase())
            }
            else message.reply("No name for the sound.")
        }
        else message.reply('No attachment or valid url')
    }
}


exports.remove = exports.r = (message) => {
    if(message.member.roles.cache.has('466619798307209216')) {
        let sound_name = message.content.split(' ')[1].toLowerCase()
        let jsonString = fs.readFileSync('./sound.json')
        let sounds = JSON.parse(jsonString)
        for(let i = 0; i < sounds.sounds.length; i++){
            if(sounds.sounds[i].name == sound_name){
                if(i == 0) {
                    sounds.sounds.shift()
                }
                else if(i == sounds.sounds.length) {
                    sounds.sounds.pop()
                }
                else {
                    let one = sounds.sounds.slice(0, i)
                    let two = sounds.sounds.slice(i+1, sounds.sounds.length+1)
                    sounds.sounds = one.concat(two)
                }
                message.react('✅')
                break
            }
        }
        fs.writeFileSync('./sound.json', JSON.stringify(sounds))
    }
}

exports.list = (message) => {
    let jsonString = fs.readFileSync('./sound.json')
    let sounds = JSON.parse(jsonString)
    let sound_list = '';
    for(let i = 0; i < sounds.sounds.length; i++) {
        sound_list += ('•' + sounds.sounds[i].name + '\n')
    }
    message.channel.send(sound_list)
}

exports.help = exports.commands = (message) => {
    message.channel.send(new discord.MessageEmbed()
        .setColor('#36302F ')
        .setTitle('Commands')
        .setDescription(`
            \`s.join\`\nJoin the bot in your current voice channel.\n
            \`s.leave\`\nLeave the bot from the voice channel.\n
            \`s.upload [sound name] + file.mp3 \` | \`s.upload [url] [sound name]\`\nAdd a sound to the bot.\n
            \`s.yt [youtube link]\`\nPlay a youtube audio/music.\n
            \`s.list\`\nDisplay the audio list.\n
            \`s.stop\`\nStop the audio.\n
            \`s.remove [sound name]\`\nRemove the sound from the bot.\n
            \`s.commands\`\nDisplay the bot's commands.`
        )
    )
}
