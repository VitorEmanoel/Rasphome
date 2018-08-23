const url = require('url')
const mongodb = require('../database')
const mongo = require('mongodb')
const config = require('../config.json')
const myconsole = require('../utils/console')

module.exports = function(req, res){

    var urls = url.parse(req.url, true)
    var db = mongodb.getDB()
    var paths = urls.pathname.split('/')
    if(paths[1] == config.web_service.url){
        if(paths.length >= 3){
            var colls = paths[2];
            var collection
            if(colls == 'sensors'){
                collection = db.collection(colls)
            }else if(colls == 'actuators'){
                collection = db.collection(colls)
            }else{
                res.writeHead(404)
                res.end()
            }
            if(req.method == "GET"){
                if(paths.length == 3){
                    console.log(myconsole.colormessage('[REQUEST] ', myconsole.colors.yellow) + req.connection.remoteAddress + " está pedindo por " + colls)
                    collection.find({}).toArray(function(err, result){
                    if(err) throw err
                        res.writeHead(200, {'Content-Type' : 'application/json'})
                        res.end(JSON.stringify(result))
                    })
                    console.log(myconsole.colormessage('[GET] ', myconsole.colors.green) + colls +" enviados para " + req.connection.remoteAddress)
                    return
                }else if(paths.length == 4){
                    var id = paths[3]
                    if(id != ''){
                        var oid = new mongo.ObjectID(id)
                        console.log(myconsole.colormessage('[REQUEST] ', myconsole.colors.yellow) + req.connection.remoteAddress + " está pedindo uma instancia de " + colls + " com id " + id)
                        collection.find({"_id" : oid}).toArray(function(err, result){
                            if(err) throw err
                            res.writeHead(200, {'Content-Type' : 'application/json'})
                            res.end(JSON.stringify(result))
                        })
                        console.log(myconsole.colormessage('[GET] ', myconsole.colors.green) + colls + " id "+ id + " enviados para " + req.connection.remoteAddress)
                        return
                    }
                }
                res.writeHead(404)
                res.end()
            }else if(req.method == "POST"){
                console.log(myconsole.colormessage('[REQUEST] ', myconsole.colors.yellow) +req.connection.remoteAddress + " está querendo registrar uma nova instancia em" + colls)
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
                        console.log(myconsole.colormessage('[POST] ', myconsole.colors.green) +req.connection.remoteAddress + " registrou " + count + " novas instancias em " + colls)
                        res.writeHead(200)
                        res.end()
                        return
                    }else{
                        if(json.hasOwnProperty('name') && json.hasOwnProperty('pin')){
                            collection.insertOne(json)
                            console.log(myconsole.colormessage('[POST] ', myconsole.colors.green) +req.connection.remoteAddress + " registrou uma nova instancia em " + colls)
                            res.writeHead(200)
                            res.end()
                            return
                        }
                    }
                    res.writeHead(404)
                    res.end()
                })
            }else if(req.method == 'PUT'){
                if(paths.length == 4){
                    var id = paths[3]
                    if(id != ''){
                        console.log(myconsole.colormessage('[REQUEST] ', myconsole.colors.yellow) +req.connection.remoteAddress + " está querendo atualizar a instancia " + id + " de " + colls)
                        var oid = new mongo.ObjectID(id)
                        var put_data = []
                        req.on('data', function(data){
                            put_data.push(data)
                        })
                        req.on('end', function(){
                            var json = JSON.parse(put_data.toString())
                            if(json.hasOwnProperty('value') || json.hasOwnProperty('name') || json.hasOwnProperty('pin')){
                                collection.updateOne({"_id": oid}, json)
                                res.writeHead(200)
                                res.end()
                                console.log(myconsole.colormessage('[PUT] ', myconsole.colors.green) +req.connection.remoteAddress + " atualizou a instancia " + id + " de " + colls)
                                return
                            }
                            res.writeHead(404)
                            res.end()
                        })
                    }
                }
                res.writeHead(404)
                res.end()
            }else if(req.method == 'DELETE'){
                if(paths.length == 4){
                    var id = paths[3]
                    if(id != ''){
                        console.log(myconsole.colormessage('[REQUEST] ', myconsole.colors.yellow) +req.connection.remoteAddress + " está querendo deletar a instancia " + id + " de " + colls)
                        var oid = new mongo.ObjectId(id)
                        collection.removeOne({'_id': oid})
                        res.writeHead(200)
                        res.end()
                        console.log(myconsole.colormessage('[DELETE] ', myconsole.colors.green) +req.connection.remoteAddress + " deletou a instancia " + id + " de " + colls)
                        return
                    }
                }
                res.writeHead(404)
                res.end()
            }else{
                res.writeHead(404)
                res.end()
            }
        }else{
            res.writeHead(404)
            res.end()
        }

    }

}