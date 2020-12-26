const db = require('../db')
let connection

module.exports = (message, args, options) => {
    let {
        command,
        description,
        expected_args = '',
        attachment = false,
        roles,
        callback
        

    } = options

    if(!(!attachment && message.attachments.first())) return

    callback(message, args, db)

}   