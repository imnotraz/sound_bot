if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const sassMiddleware = require('node-sass-middleware')
const path = require('path')
const PORT = process.env.PORT
const app = express()

var bodyParser = require('body-parser')

app.use(sassMiddleware({
    src: path.join(__dirname, 'style'),
    dest: path.join(__dirname, 'public'),
    outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'nested',
    debug: process.env.NODE_ENV !== 'production'
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')


const discord = require('discord.js')
const client = new discord.Client()
const { prefix } = require('./config.json')
const c_manager = require('./command_manager/command-manager')

const token = process.env.TOKEN
client.login(token)

client.on('ready', () => {
    console.log("-- sound_bot is online --")
})


client.on('message', message => {
    if (message.author != '712929072396763146') {
        try {

            if (message.content.startsWith(`${prefix}.`)) {
                console.log(`-- command [${message.content.split(' ')[0]}] requested by <${message.author.username}@${message.author.id}> --`)
                let command = message.content.split('.')[1].split(' ')[0]
                let args = message.content.split(/[ ]+/).slice(1)

                c_manager.run_command(message, command, args)
            }
            else {
                c_manager.play(message)
            }

        }
        catch (err) { }
    }
})

app.get('/', (req, res) => {

    commands.joinChannel(client, () => {
        functions.list_sounds((sounds) => {
            res.render('index.html', {
                sounds: sounds
            })
        })
    })
})

app.post('/stop', (req, res) => {
    commands.stop()
})

app.post('/play/sound', (req, res) => {
    commands.play_sound(req.body.sound.toLowerCase())
    res.end();
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
