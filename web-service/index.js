const http = require('http')
const cwd = process.argv[1]
const api = require(cwd + "/web-service/api")
const myconsole = require(cwd + '/utils/console')
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


