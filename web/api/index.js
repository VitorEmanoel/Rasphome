const url = require('url');
const mongodb = require('../../database');
const controller = require('./controller');
const config = require('../../config.json');

module.exports = function(req, res){

    let urls = url.parse(req.url, true);
    let paths = urls.pathname.split('/');
    if(paths[1].toLowerCase() === config.web_service.url && paths.length >= 3){
        if(paths[2].toLowerCase() === 'sensors' || paths[2].toLowerCase() === 'actuators'){
            let collection = mongodb.getDB().collection(paths[2]);
            if(req.method === 'GET'){
                controller.GET(collection, paths, function(err, result){
                    if(err){
                        res.writeHead(404);
                        res.end();
                        return
                    }
                    res.writeHead(200, {'Content-Type' : 'application/json'});
                    res.end(JSON.stringify(result))
                });
                return
            }else if(req.method === 'POST'){
                controller.POST(collection, req, function(err){
                    if(err){
                        res.writeHead(404);
                        res.end();
                        return
                    }
                    res.writeHead(201);
                    res.end()
                });
                return
            }else if(req.method === 'PUT'){
                controller.PUT(collection, paths, req, function(err){
                    if(err){
                        res.writeHead(404);
                        res.end();
                        return
                    }
                    res.writeHead(200);
                    res.end()
                });
                return
            }else if(req.method === 'DELETE'){
                controller.DELETE(collection, paths, function(err){
                    if(err){
                        res.writeHead(404);
                        res.end();
                        return
                    }
                    res.writeHead(200);
                    res.end()
                });
                return
            }
        }
        res.writeHead(404);
        res.end();
    }
};