if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const path = require('path')
const PORT = process.env.PORT
const app = express()

var bodyParser = require('body-parser')

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
const commands = require('./commands.js')
const functions = require('./functions.js')
const {
    prefix
} = require('./config.json')


const token = process.env.TOKEN
client.login(token)


client.on('message', async message => {
    if (message.author != '712929072396763146') {
        message.guild.owner

        try {
            if (message.content.startsWith(`${prefix}.`)) {
                let command = message.content.split('.')[1].split(' ')[0]
                eval(`commands.${command}(message)`)
            } else {
                commands.play_sound(message.content.toLowerCase())
            }
        } catch (err) {}
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

app.post('/', (req, res) => {

    commands.play_sound(req.body.sound.toLowerCase())
    res.end();
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))