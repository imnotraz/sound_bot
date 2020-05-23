const discord = require('discord.js')
const client = new discord.Client()
const { prefix, TOKEN } = require('./config.json')
const fs = require('fs')
const commands = require('./commands.js')
client.login(TOKEN)
let connection, dispatcher

client.on('message', async message => {

    if(message.author != '712929072396763146'){

        try {
            if(message.content.startsWith(`${prefix}.`)){
                let command = message.content.split('.')[1].split(' ')[0]

                if(command == 'join' || command == 'j') 
                    connection = await message.member.voice.channel.join()

                else if(command == 'leave' || command == 'l') 
                    connection.disconnect()
                
                else if(command == 'stop' || command == 's') 
                    dispatcher.destroy()

                else if(command == 'yt'){
                    let link = message.content.split(' ')[1]
                    dispatcher = connection.play(yt(link, {filter: 'audioonly'}))
                }
                else 
                    eval(`commands.${command}(message)`)
                
            }
            else if(connection.status == 0) {
                let jsonString = fs.readFileSync('./sound.json')
                let sounds = JSON.parse(jsonString)
                for(let i = 0; i < sounds.sounds.length; i++) {
                    if(sounds.sounds[i].name == message.content.toLowerCase()) {
                        dispatcher = connection.play(sounds.sounds[i].url)    
                        break
                    }
                }
                
            }
        }
        catch(err) {}
    }
})

