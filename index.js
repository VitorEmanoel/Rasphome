const webservice = require('./web-service');
const myconsole = require('./utils/console');
const mongodb = require('./database');
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
    mongodb.open()
}

function stop(){
    myconsole.clear();
    mongodb.close();
    webservice.stop();
    process.exit(0)
}
if(process.arch === 'arm' && process.platform === 'linux'){
    start()
}else{
    console.log(myconsole.colors.red + "[Erro] " + myconsole.colors.white + "Não foi possivel iniciar o Rasphome");
    console.log(myconsole.colors.red + "[Erro] " + myconsole.colors.white + "Esse plataforma foi feita para ser usada somente no Raspberry PI ");
    process.exit()
}
