exports.list = {
    command: 'list',
    description: 'Display the list with all sounds.',
    roles: [],
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


exports.upload = exports.u = {
    command: 'upload',
    description: 'Upload a sound to the bot',
    expected_args: '<mp3 file>',
    attachment: true,
    roles: ['Vip'],
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


exports.play = {
    command: 'play',
    desciption: 'Play a sound.',
    expected_args: '<sound>',
    roles: [],
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


exports.join = exports.j = {
    command: 'join',
    description: 'Join the bot in your current voice channel.',
    roles: [],
    callback: async (message) => {
        await message.member.voice.channel.join()
        
    }
}


exports.leave = exports.l = {
    command: 'leave',
    description: 'Leave the bot from the voice channel.',
    roles: [],
    callback: async (message) => {
        await message.member.voice.channel.leave()
    }
}