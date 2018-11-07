const webservice = require('../web');
const myconsole = require('../utils/console');
const database = require('../database');
process.title = 'rasphome';

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
    database.start();
}

function stop(){
    myconsole.clear();
    webservice.stop();
    database.stop();
    process.exit(0)
}
start();
