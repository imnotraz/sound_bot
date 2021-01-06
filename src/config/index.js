const dotenv = require('dotenv')

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV !== 'production') {
  const envFound = dotenv.config()
  if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️")
  }
}

module.exports = {
  /**
   * Discord token used by the bot
   */
  discordToken: process.env.DISCORD_TOKEN,

  /**
   * Bot prefix
   */
  prefix: 'v.',

  /**
   * The URL for Mongo DB
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * The port used by the web server
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * The configuration for the api
   */
  api: {
    /**
     * The prefix for the routes of the api
     */
    prefix: '/api'
  }
}
