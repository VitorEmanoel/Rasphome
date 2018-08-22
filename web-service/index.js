const http = require('http')
const api = require("../web-service/api")
const config = require('../config.json')
const myconsole = require('../utils/console')
let server

server = http.createServer(function(req, res){
    api(req, res)
})

module.exports = {
    
    start : function(){
        console.log(myconsole.colormessage('[WebService] ', myconsole.colors.yellow) + 'Iniciando...')
        server.listen(config.web_service.port, config.web_service.host, function(erro){
            if(erro){
               throw erro 
            }
            console.log(myconsole.colormessage('[WebService] ', myconsole.colors.yellow) + 'Iniciado com sucesso ' + myconsole.colormessage('[OK]', myconsole.colors.green))
        })
    },

    stop : function(){
        console.log('Desligando Web service')
        server.close()
        console.log('Web service desligado')
    }

}


