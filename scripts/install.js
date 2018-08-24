const fs = require('fs')

fs.writeFile('/var/runn/rasphome.pid', '', function(err){
    if(err)throw err
    console.log('Arquivo PID criado com sucesso!')
})

fs.writeFile('/etc/init.d/rasphome', fs.readFileSync('./rasphome'), function(err){
    if(err) throw err
    console.log('init.d criado com sucesso')
})