const discord = require('discord.js')
const client = new discord.Client()
const commands = require('./commands.js')
const { prefix } = require('./config.json')
const token = process.env.TOKEN
client.login(token)


client.on('message', async message => {
    if(message.author != '712929072396763146'){
        message.guild.owner
        
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

