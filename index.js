const webservice = require('./web-service')
const myconsole = require('./utils/console')
const mongodb = require('./database')
const fs = require('fs')
process.title = 'rasphome'

process.on("SIGTERM", function(){
    stop()
})

function start(){
    myconsole.move(0,0)
    myconsole.clear()
    myconsole.setcolor(myconsole.colors.white)
    webservice.start()
    mongodb.open()
}

function stop(){
    myconsole.clear()
    mongodb.close()
    webservice.stop()
    process.exit(0)
}
if(process.arch == 'arm' && process.platform == 'linux'){
    start()
}else{
    console.log('Somente pode ser usado por Raspberry Pi')
    process.exit()
}
