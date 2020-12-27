const discord = require('discord.js')
const yt = require('ytdl-core')

exports.list = {
    command: 'list',
    description: 'Display the list with all sounds.',
    callback: (message, db) => {
        let sound_list = '';
        db.get_sounds((sounds) => {
            for(let s of sounds) {
                sound_list += ('- ' + s.name + '\n')
            }
            message.channel.send(sound_list)
        })
    }
}

exports.upload = {
    command: 'upload',
    description: 'Upload a sound to the bot',
    expected_args: '<mp3 file as attachment>',
    attachment: true,
    role: 'Vip',
    callback: (message, args, db) => {
        let attachment = message.attachments.first()
        if(attachment.name.split('.')[1] == 'mp3') {
            if(attachment.size < 1001000) {
                db.insert_sound({name: args[0]}, () => {
                    console.log(`-- ${args[0]} sound added to the list --`)
                    message.react('✔️')
                })
            }
            else message.reply('File too big or name too long.')
        }
        else message.reply('The file must be a mp3 file.')
    }
}

exports.remove = {
    command: 'remove',
    description: 'Remove a sound from the bot',
    expected_args: '<sound name>',
    role: 'Vip',
    callback: (message, args, db) => {
        db.remove_sound(args, () => {
            message.react('✔️')
        })
    }
}


exports.play = {
    command: 'play',
    desciption: 'Play a sound.',
    expected_args: '<sound>',
    callback: (message, args, db) => {
        let connection = message.guild.voice.connection
        if(connection.status == 0) {
            db.get_sound(args, (url, find) => {
                if(find) {
                    dispatcher = connection.play(url)
                    console.log(`-- sound [${args}] is playing --`)
                }
            })

        }
    }
}


exports.join = {
    command: 'join',
    description: 'Join the bot in your current voice channel.',
    callback: async (message) => {
        console.log("e dai dio")
        await message.member.voice.channel.join()
        
    }
}

exports.yt = {
    command: 'yt',
    description: 'Play a youtube audio.',
    expected_args: '<youtube link>',
    callback: async (message, args) => {

        let connection = message.guild.voice.connection
        
        if(connection.status == 0) {
            connection.play(yt(args[0], {filter: 'audioonly'}))
            message.react('✔️')
            yt.getBasicInfo(args[0]).then( info => {
                console.log(`-- the bot is playing ${info.videoDetails.title} --`)
                message.channel.send(new discord.MessageEmbed()
                .setColor('#36302F ')
                .setTitle('Youtube')
                .setDescription(`Now playing \`${info.videoDetails.title}\`\nBy ${message.author}`)
            )
            })

            /*
            message.channel.send(new discord.MessageEmbed()
                .setColor('#36302F ')
                .setTitle('Youtube')
                .setDescription(`Now playing `)
            )
            */
            //console.log(`-- the bot is playing yt link ${yt.getBasicInfo(args[0])} --`)
        }
        else {
            console.log("qua")
            message.channel.send("The bot must join a channel")
        }

    }
}

exports.web = {
    command: 'web',
    description: 'THE WEB SITEEEEEEEEEEEEE',
    callback: (message) => {
        message.channel.send("Click here noob >https://weeb-sound-bot.herokuapp.com/")
    }
}
exports.leave = {
    command: 'leave',
    description: 'Leave the bot from the voice channel.',
    callback: async (message) => {
        await message.member.voice.channel.leave()
    }
}

exports.help = {
    callback: async (message, ttt) => {
        const all_commands = require(`../commands/${ttt}`)
        let desc = ''
        
        for(let c in all_commands){
            desc += `\`s.${all_commands[c].command} ${all_commands[c].expected_args ? all_commands[c].expected_args : ''}\`\n${all_commands[c].description}\n\n`
        }

        message.channel.send(new discord.MessageEmbed()
            .setColor('#36302F ')
            .setTitle('Commands')
            .setDescription(desc)
        )
        .then(m => {
            m.react('🎵')
            .then( () => {
                m.awaitReactions(r =>  r.emoji.name === '🎵', { max: 1})
                .then( () => {
                    let ff = ''
                    const playerc = require('./player')
                    for(let p in playerc) {
                        ff += `\`s.${playerc[p].command} ${playerc[p].expected_args ? playerc[p].expected_args : ''}\`\n${playerc[p].description}\n\n`
                    }
                    m.edit(new discord.MessageEmbed()
                    .setColor('#36302F ')
                    .setTitle('Commands')
                    .setDescription(ff))
                })
                
            })
        })
        
        
    }
}


