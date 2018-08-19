const cwd = process.argv[1]
const webservice = require(cwd + '/web-service')
const myconsole = require(cwd + '/utils/console')
const mongodb = require(cwd +'/database')
const fs = require('fs')

myconsole.move(0,0)
myconsole.clear()
myconsole.setcolor(myconsole.colors.lightblue)
console.log(fs.readFileSync(cwd + '/welcome.txt').toString().substring(1))
myconsole.setcolor(myconsole.colors.white)
webservice.start()
mongodb.open()