const discord = require('discord.js')
const client = new discord.Client()
const { prefix } = require('./config.json')
const commando = require('./command_manager/command-manager')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const token = process.env.TOKEN
client.login(token)


client.on('ready', () => {
    console.log("-- sound_bot is online --")
})


client.on('message', async message => {
    if(message.author != '712929072396763146'){
        try {
    
            if(message.content.startsWith(`${prefix}.`)){
                console.log(`-- command [${message.content.split(' ')[0]}] requested by <${message.author.username}@${message.author.id}> --`)
                let command = message.content.split('.')[1].split(' ')[0]
                let args = message.content.split(/[ ]+/).slice(1)
                
                commando.run_command(message, command, args)
                //eval(`commando(message, args, ccm.${command})`)
            }
            else {
                commands.play_sound(message.content.toLowerCase())
            }

            
        }
        catch(err) {}
    }
})
