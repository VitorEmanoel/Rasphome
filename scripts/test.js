const webservice = require('../web-service');
const myconsole = require('../utils/console');
const mongodb = require('../database');
process.title = 'rasphome';

process.on("SIGTERM", function(){
    stop()
});

process.on("SIGTERM", function(){
    stop()
});

process.on("SIGINT", function(){
    stop()
});


function start(){
    myconsole.move(0,0);
    myconsole.clear();
    myconsole.setcolor(myconsole.colors.white);
    webservice.start();
    mongodb.open()
}

function stop(){
    myconsole.clear();
    mongodb.close();
    webservice.stop();
    process.exit(0)
}
start();