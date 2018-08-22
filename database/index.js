const MongoClient = require('mongodb').MongoClient
const config = require('../config.json')
const myconsole = require('../utils/console')
var database
var url = "mongodb://" + config.mongodb.host + ":" + config.mongodb.port + "/"

function open(){
    console.log(myconsole.colormessage('[Database] ', myconsole.colors.yellow) +'Conectando...')
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client){
        if(err){
            throw err
        }
        database = client.db('rasphome')
        console.log(myconsole.colormessage('[Database] ', myconsole.colors.yellow) + 'Conectado com sucesso ' + myconsole.colormessage('[OK]', myconsole.colors.green))
    })
}

function getDB(){
    return database
}

function close(){
    database.close()
}

module.exports.open = open
module.exports.close = close
module.exports.getDB = getDB
