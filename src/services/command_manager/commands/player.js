const discord = require('discord.js')
const yt = require('ytdl-core')

let queue = []
let is_playing

exports.stop = {
    command: 'stop',
    description: 'Stop the youtube audio.',
    callback: (message) => {
        message.guild.voice.connection.dispatcher.destroy()
    }
}

exports.skip = {
    command: 'skip',
    description: 'Skip the queue to the next song.',
    callback: (message) => {
        if (queue[0]) {
            play_song(queue[0].link, message)
            queue.slice()
        }
        else
            message.channel.send('No more songs.')
    }
}

exports.clear = {
    command: 'clear',
    description: 'Clear the queue.',
    callback: () => {
        queue = []
    }
}

exports.pause = {
    command: 'pause',
    description: 'Pause the song.',
    callback: (message) => {
        let connection = message.guild.voice.connection
        if (connection.status == 0)
            connection.dispatcher.pause(true)
    }
}

exports.resume = {
    command: 'resume',
    description: 'Resume the song.',
    callback: (message) => {
        let connection = message.guild.voice.connection
        if (connection.dispatcher.paused)
            connection.dispatcher.resume()
    }
}


exports.yt = {
    command: 'yt',
    description: 'Play a youtube audio.',
    expected_args: '<youtube link>',
    callback: (message, args) => {

        let connection = message.guild.voice.connection

        if (connection.status == 0) {
            if (!is_playing) {
                play_song(args[0], message)
            }
            else {
                queue.push({ 'link': args[0], 'by': message.author.id })
                yt.getBasicInfo(args[0]).then(info =>
                    message.channel.send(new discord.MessageEmbed()
                        .setColor('#900C3F')
                        .setTitle('YOUTUBE')
                        .setDescription(`**Song added to the queue**\n\`\`\`${info.videoDetails.title}\`\`\``)
                        .setFooter('Sound Bot'))
                )
            }
        }
        else {
            message.channel.send("The bot must join a channel")
        }

        connection.dispatcher.on('finish', () => {
            is_playing = false
            if (queue[0]) {
                play_song(queue[0].link, message)
                queue.shift()
            }
        })

        connection.dispatcher.on('close', () => is_playing = false)

    }

}

exports.queue = {
    command: 'queue',
    description: 'Diplay the queue.',
    callback: async (message) => {
        let q_list = ''

        if (queue[0]) {
            let info
            for (let q in queue) {
                info = await yt.getBasicInfo(queue[q].link)
                console.log(info.videoDetails.title)
                q_list += `- ${info.videoDetails.title}\n`

            }
            message.channel.send(q_list)
        }
        else
            message.channel.send("No queue")
    }
}


function play_song(link, message) {

    message.guild.voice.connection.play(yt(link, { filter: 'audioonly' }))
    message.react('✔️')
    is_playing = true
    yt.getBasicInfo(link).then(info => {
        console.log(`-- the bot is playing ${info.videoDetails.title} --`)
        message.channel.send(new discord.MessageEmbed()
            .setColor('#900C3F')
            .setTitle('YOUTUBE')
            .setDescription(`**Now playing** by${message.author}\n\`\`\`${info.videoDetails.title}\`\`\``)
            .setFooter('Sound Bot')
        )
    })


}


