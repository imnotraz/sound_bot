const discord = require('discord.js')
const fs = require('fs')
const db = require('./db.js')
const yt = require('ytdl-core')
let connection, dispatcher


exports.play_sound = (sound_name) => {
    if(connection.status == 0) {
        db.get_sound(sound_name, (url, find) => {
            if(find) dispatcher = connection.play(url)
        })
    }
}

exports.join = exports.j = async (message) => {
    connection = await message.member.voice.channel.join()
}

exports.leave = exports.l = (message) => {
    connection.disconnect()
}

exports.stop = exports.s = (message) => {
    dispatcher.destroy()
}

exports.yt = (message) => {
    if(connection.status == 0) {
        let link = message.content.split(' ')[1]
        message.react('✔️')
        dispatcher = connection.play(yt(link, {filter: 'audioonly'}))
    }
    else {
        message.channel.send("The bot must join a channel")
    }
}

exports.upload = exports.u = (message) => {
    if(message.member.roles.cache.has('466619798307209216')) { 

        let sl = message.content.split(' ')[1]
        let sn = message.content.split(' ')[2]
        let add_sound = function(name, url) {
            let new_sound = {
                name: name,
                url: url
            }
            db.insert_sound(new_sound, () => {
                message.react('✔️')
            })
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
    else message.react('❌')
}

exports.remove = exports.r = (message) => {
    if(message.member.roles.cache.has('466619798307209216')) {
        let sound_name = message.content.split(' ')[1].toLowerCase()
        db.remove_sound(sound_name, () => {
            message.react('✔️')
        })
    }
    else message.react('❌')
}

exports.list = (message) => {
    let sound_list = '';
    db.get_sounds((sounds) => {
        for(let i = 0; i < sounds.length; i++) {
            sound_list += ('- ' + sounds[i].name + '\n')
        }
        message.channel.send(sound_list)
    })
}

exports.help = (message) => {
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
            \`s.help\`\nDisplay the bot's commands.`
        )
    )
}
