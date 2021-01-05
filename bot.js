const discord = require('discord.js')
const client = new discord.Client()
const c_manager = require('./command_manager/command-manager')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const token = process.env.TOKEN
const prefix = process.env.PREFIX

client.login(token)

client.on('ready', () => {
    console.log("-- sound_bot is online --")
})

client.on('message', message => {
    if(message.author != '712929072396763146'){
        try {
            if(message.content.startsWith(`${prefix}`)){
                console.log(`-- command [${message.content.split(' ')[0]}] requested by <${message.author.username}@${message.author.id}> --`)
                let command = message.content.split(prefix)[1].split(' ')[0]
                let args = message.content.split(/[ ]+/).slice(1)
                c_manager.run_command(message, command, args)
            }
            else c_manager.play(message)
        }
        catch(err) {}
    }
})
