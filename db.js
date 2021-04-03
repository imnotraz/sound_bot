const mongodb = require('mongodb');
////////////// DA CAMBIARE

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const uri = process.env.DATABASEURL
let database
mongodb.connect(uri, {useUnifiedTopology: true}, (err, c) => {
    database = c.db('soundbot')
})


exports.insert_sound = (sound, callback) => {
    database.collection('sounds').insertOne({"name": sound.name, "url": sound.url}, () => {
        callback()
    })
}

exports.get_sounds = (callback) => {
    database.collection('sounds').find().toArray((err,sounds) => {
        callback(sounds)
    })
}

exports.remove_sound = (sound_name, callback) => {
    console.log("remo")
    database.collection('sounds').deleteOne({"name": sound_name}, (err) => {
        if(err) console.log(err)
        else callback()
    })
}

exports.get_sound = (sound_name, callback) => {
    database.collection('sounds').findOne({"name": sound_name}, (err, sound) => {
        if(sound) callback(sound.url, true)
        else callback('', false)
    })
}
