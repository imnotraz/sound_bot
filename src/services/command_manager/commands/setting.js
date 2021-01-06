const discord = require('discord.js')

exports.help = {
    command: 'help',
    description: 'Display the commands of the bot.',
    callback: async (message) => {

        let types = (ms, type) => {
            let desc = ''
            const all_commands = require(`../commands/${type}`)
            
            for(let c in all_commands){
                desc += `\`s.${all_commands[c].command} ${all_commands[c].expected_args ? all_commands[c].expected_args : ''}\`\n${all_commands[c].description}\n\n`
            }
            ms.edit(new discord.MessageEmbed()
            .setColor('#900C3F')
            .setTitle(`${type.toUpperCase()}`)
            .setDescription(desc)
            .setFooter('Sound Bot')
            )
            .then(mss => {
                set_reaction(mss)
            })
        }

        let set_reaction = (m) => {
            m.reactions.removeAll()
            m.react('🔊')
            .then(() => {
                m.react('🎵')
                .then(() => {
                    m.react('⚙️')
                    .then(() => {
                        m.awaitReactions((r, u) => (r.emoji.name === '🎵' || r.emoji.name === '🔊' || r.emoji.name === '⚙️') && u.id != '712929072396763146', {max: 1, time: 15000})
                        .then(collected => {
                            let e = collected.first()
                            if(e.emoji.name == '🔊') {
                                types(m, 'sound')
                            }
                            else if(e.emoji.name == '🎵') {
                                types(m, 'player')
                            }
                            else if(e.emoji.name == '⚙️') {
                                types(m, 'setting')
                            }
                        })
                        .catch(e => {
                            console.log("Timeout")
                        })
                    })
                })
            })
        }        

        message.channel.send(new discord.MessageEmbed())
        .then(m => {
            types(m, 'sound')
        })
    }
}


exports.set = {
    command: 'set',
    description: 'Set something...',
    expected_args: '<prefix>',
    callback: ''
}

exports.web = {
    command: 'web',
    description: 'The website link',
    callback: (message) => {
        message.channel.send("Click here >https://weeb-sound-bot.herokuapp.com/")
    }
}