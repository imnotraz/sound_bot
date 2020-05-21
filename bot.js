const discord = require('discord.js')
const client = new discord.Client()
const { prefix, TOKEN } = require('./config.json')
const fs = require('fs')
client.login(TOKEN)
let connection

client.on('message', async message => {
    
    if(message.author != '712929072396763146'){
        
        if(message.content.startsWith(`${prefix}.`)){
            let msg = message.content.split('.')[1]

            if(msg == 'join') {
                if(message.member.voice.channel) {
                    connection = await message.member.voice.channel.join()
                    
                }
                else message.reply('You need to join a channel.')
            }

            else if(msg == 'leave') 
                connection.disconnect()
            
            else if(msg == 'upload') {
                if(message.member.roles.cache.has('712957623498047521') || message.member.roles.cache.has('626157712442654791') || message.member.roles.cache.has('466619630715404288') || message.member.roles.cache.has('601842730749919242')){
                    if(message.attachments.first()) {
                        if(message.attachments.first().name.split('.')[1] == 'mp3') {
                            let new_sound = {
                                name: message.attachments.first().name.split('.')[0],
                                url: message.attachments.first().url
                            }
                            const jsonString = fs.readFileSync('./sound.json')
                            const sounds = JSON.parse(jsonString)
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
                        else message.reply("The file has to be .mp3 file.")
                    }
                    else message.reply("There is no file.")
                }
                else message.reply("You have no permission.")
            }

            else if(msg.split(' ')[0] == 'remove') {
                if(message.member.roles.cache.has('712957623498047521') || message.member.roles.cache.has('626157712442654791') || message.member.roles.cache.has('466619630715404288') || message.member.roles.cache.has('601842730749919242')){
                    let sound_name = msg.split(' ')[1]
                    const jsonString = fs.readFileSync('./sound.json')
                    const sounds = JSON.parse(jsonString)
                    for(let i = 0; i<sounds.sounds.length; i++){
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
                            break;
                        }
                    }
                    fs.writeFileSync('./sound.json', JSON.stringify(sounds))
                }
            }
            else if(msg == 'commands') {
                message.channel.send(new discord.MessageEmbed()
                    .setColor('#36302F ')
                    .setTitle('Commands')
                    .setDescription(`
                        \`sound.join\`\nJoin the bot in your current voice channel.\n
                        \`sound.leave\`\nLeave the bot from the voice channel.\n
                        \`sound.upload + file.mp3\`\nAdd a sound to the bot. The message need an attached file (the sound).\n(the name of the file will be the name of the sound)\n(use underscore for whitespace).\n
                        \`sound.remove [sound name]\`\nRemove the sound from the bot.\n
                        \`sound.commands\`\nDisplay the commands of the bot.` 
                    )
                )
            }

        }

        else if(connection.status == 0) {
            const jsonString = fs.readFileSync('./sound.json')
            const sounds = JSON.parse(jsonString)
            for(let i = 0; i < sounds.sounds.length; i++) {
                if(sounds.sounds[i].name == message.content) {
                    connection.play(sounds.sounds[i].url)
                    break;
                }
            }
        }
    }
})

