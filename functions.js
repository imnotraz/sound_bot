const db = require('./db.js')


exports.list_sounds = (callback) => {
    
    db.get_sounds((sounds) => {callback(sounds)})
    
}