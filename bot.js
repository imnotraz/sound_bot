const discord = require('discord.js')
const client = new discord.Client()
const { prefix, TOKEN } = require('./config.json')
const fs = require('fs')
const yt = require('ytdl-core')
const commands = require('./commands.js')
const db = require('./db.js')

client.login(TOKEN)
let connection, dispatcher

client.on('message', async message => {

    if(message.author != '712929072396763146'){

        try {
            if(message.content.startsWith(`${prefix}.`)){
                let command = message.content.split('.')[1].split(' ')[0]
                eval(`commands.${command}(message)`)
            }
            else {
                commands.play_sound(message.content.toLowerCase())
                
            }
        }
        catch(err) {}
    }
})

