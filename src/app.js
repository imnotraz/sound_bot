const config = require('./config')
const discord = require('discord.js')
const express = require('express')
const path = require('path')

async function startServer() {
    const client = new discord.Client()
    const app = express()

    await require('./loaders')({ discordClient: client, expressApp: app })

    client.login(config.discordToken)
    app.listen(config.port, () => {
        console.log(`Listening on ${config.port}`)
    }).on('error', err => {
        console.log("Couldn't start server")
        process.exit(1)
    });

}

startServer();
