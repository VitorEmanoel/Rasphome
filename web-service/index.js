const http = require('http')
const api = require("./api")
const config = require('../config.json')
const myconsole = require('../utils/console')
const colors = myconsole.colors

let server = http.createServer(function(req, res){
    try{
        api(req, res)
    }catch(e){
        console.log(myconsole.colormessage('[ERROR] ', colors.red) + 'Ocorreu um erro durante a uma requisão de ' + req.connection.remoteAddress)
        console.log(myconsole.colormessage('[ERROR] ', colors.red) + 'Erro: ' + e)
        res.writeHead(400)
        res.end()
    }

})

module.exports.start = start
module.exports.stop = stop
    
 function start(){
    console.log(myconsole.colormessage('[WebService] ', myconsole.colors.yellow) + 'Iniciando...')
    server.listen(config.web_service.port, config.web_service.host, function(erro){
        if(erro){
            throw erro 
        }
        console.log(myconsole.colormessage('[WebService] ', myconsole.colors.yellow) + 'Iniciado com sucesso ' + myconsole.colormessage('[OK]', myconsole.colors.green))
    })
}

function stop(){
    console.log(myconsole.colormessage('[WebService] ', myconsole.colors.yellow) + 'Desligando...')
    server.close()
    console.log(myconsole.colormessage('[WebService] ', myconsole.colors.yellow) + 'Desligado com sucesso ' + myconsole.colormessage('[OK]', myconsole.colors.green))
}