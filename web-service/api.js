const url = require('url')
const mongodb = require('../database')
const controller = require('./api/controller')
const config = require('../config.json')
const myconsole = require('../utils/console')

module.exports = function(req, res){

    var urls = url.parse(req.url, true)
    var paths = urls.pathname.split('/')
    if(paths[1].toLowerCase() == config.web_service.url && paths.length >= 3){
        if(paths[2].toLowerCase() === 'sensors' || paths[2].toLowerCase() === 'actuators'){
            var collection = mongodb.getDB().collection(paths[2])
            if(req.method == 'GET'){
                controller.GET(collection, paths, function(err, result){
                    res.writeHead(200, {'Content-Type' : 'application/json'})
                    res.end(JSON.stringify(result))
                })
            }else if(req.method == 'POST'){
                controller.POST(collection, req)
                res.writeHead(200)
                res.end()
            }else if(req.method == 'PUT'){
                controller.PUT(collection, paths, req)
                res.writeHead(200)
                res.end()
            }else if(req.method == 'DELETE'){
                controller.DELETE(collection, paths)
                res.writeHead(200)
                res.end()
            }
        }
    }

}