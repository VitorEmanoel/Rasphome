const url = require('url')
const mongodb = require('../database')
const config = require('../config.json')
const myconsole = require('../utils/console')

module.exports = function(req, res){

    var urls = url.parse(req.url, true)
    var db = mongodb.getDB()
    var paths = urls.pathname.split('/')
    console.log(paths.length)
    if(paths[1] == config.web_service.url){
        if(db.listCollections().contains(paths[2])){
            var collection = db.collection(paths[2])
            if(req.method == "GET"){
                if(paths.length == 3){
                    console.log(myconsole.colormessage('[REQUEST] ', myconsole.colors.yellow) + req.connection.remoteAddress + " está pedindo os sensores.")
                    collection.find({}).toArray(function(err, result){
                        if(err) throw err
                        res.writeHead(200, {'Content-Type' : 'application/json'})
                        res.end(JSON.stringify({sensors : result}))
                    })
                    console.log(myconsole.colormessage('[GET] ', myconsole.colors.green) +"Sensores enviados para " + req.connection.remoteAddress)
                }else if(paths.length == 4){

                }
            }else if(req.method == "POST"){
                if(paths[2] == 'sensors'){
                    console.log(myconsole.colormessage('[REQUEST] ', myconsole.colors.yellow) +req.connection.remoteAddress + " está querendo registrar um novo sensor")
                    var post_data = []
                    req.on('data', function(data){
                        post_data.push(data)
                    })
                    req.on('end', function(){
                        var json = JSON.parse(post_data.toString())
                        if(Array.isArray(json)){
                            var count = 0
                            for(var i = 0; i < json.length; i++){
                                if(json[i].hasOwnProperty('name') && json[i].hasOwnProperty('pin')){
                                    collection.insertOne(json[i])
                                    count++
                                }
                            }
                            console.log(myconsole.colormessage('[POST] ', myconsole.colors.green) +req.connection.remoteAddress + " registrou " + count + " novos sensores")
                        }else{
                            if(json.hasOwnProperty('name') && json.hasOwnProperty('pin')){
                                collection.insertOne(json)
                                console.log(myconsole.colormessage('[POST] ', myconsole.colors.green) +req.connection.remoteAddress + " registrou um novo sensor")
                            }
                        }
                        res.end()
                    })
                }
            }
        }else{
            res.writeHead(404)
            res.end()
        }
    }

}