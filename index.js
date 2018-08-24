const webservice = require('./web-service')
const myconsole = require('./utils/console')
const mongodb = require('./database')
const fs = require('fs')
process.title = 'rasphome'

if(process.argv[2] == 'deamon'){
    fs.writeFile('/etc/init.d/rasphome', fs.readFileSync('./rasphome'), function(err){
        if(err) throw err
        console.log('Deamon criado com sucesso!')
    })
    process.exit()
}

process.on("SIGTERM", function(){
    stop()
})

function start(){
    myconsole.move(0,0)
    myconsole.clear()
    myconsole.setcolor(myconsole.colors.white)
    webservice.start()
    mongodb.open()
    fs.writeFile('/var/run/rasphome.pid', process.pid, function(err){
        if(err)throw err
    })
}

function stop(){
    myconsole.clear()
    mongodb.close()
    webservice.stop()
    fs.writeFile('/var/run/rasphome.pid', '', function(err){
        if(err) throw err
        console.log('PID limpo com sucesso.')
    })
    process.exit(0)
}
if(process.arch == 'arm' && process.platform == 'linux'){
    start()
}else{
    console.log('Somente pode ser usado por Raspberry Pi')
    process.exit()
}
