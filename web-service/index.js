const http = require('http');
const api = require("./api");
const config = require('../config.json');
const myconsole = require('../utils/console');
const colors = myconsole.colors;

let server = http.createServer(function(req, res){
    api(req, res)

});

module.exports.start = start;
module.exports.stop = stop;
    
 function start(){
    console.log(myconsole.colormessage('[WebService] ', colors.yellow) + 'Iniciando...');
    server.listen(config.web_service.port, config.web_service.host, function(erro){
        if(erro){
            throw erro 
        }
        console.log(myconsole.colormessage('[WebService] ', colors.yellow) + 'Iniciado com sucesso ' + myconsole.colormessage('[OK]', colors.green))
    })
}

function stop(){
    console.log(myconsole.colormessage('[WebService] ', colors.yellow) + 'Desligando...');
    server.close();
    console.log(myconsole.colormessage('[WebService] ', colors.yellow) + 'Desligado com sucesso ' + myconsole.colormessage('[OK]', colors.green));
}