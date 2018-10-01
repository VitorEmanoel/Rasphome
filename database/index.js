const MongoClient = require('mongodb').MongoClient;
const config = require('../config.json');
const myconsole = require('../utils/console');
let database;
let url = "mongodb://" + config.mongodb.host + ":" + config.mongodb.port + "/";
let cclient;

function open(){
    console.log(myconsole.colormessage('[Database] ', myconsole.colors.yellow) +'Conectando...');
    try {
        MongoClient.connect(url, function (err, client) {
            if (err) {
                throw err
            }
            cclient = client;
            database = client.db('rasphome');
            console.log(myconsole.colormessage('[Database] ', myconsole.colors.yellow) + 'Conectado com sucesso ' + myconsole.colormessage('[OK]', myconsole.colors.green));
        })
    }catch(e){
        console.log(myconsole.colormessage('[Database] ', myconsole.colors.yellow)+'Ocorreu um erro ao se conectar com o banco de dados');
        console.log(myconsole.colormessage('[Erro] ', myconsole.colors.red) + e.toString())
    }
}

function getDB(){
    return database
}

function close(){
    console.log(myconsole.colormessage('[Database] ', myconsole.colors.yellow) +'Desconectando...');
    cclient.close();
    console.log(myconsole.colormessage('[Database] ', myconsole.colors.yellow) + 'Desconectado com sucesso ' + myconsole.colormessage('[OK]', myconsole.colors.green));
}

module.exports.open = open;
module.exports.close = close;
module.exports.getDB = getDB;
