const cwd = process.argv[1]
const webservice = require('./web-service')
const myconsole = require('./utils/console')
const mongodb = require('./database')
const fs = require('fs')

myconsole.move(0,0)
myconsole.clear()
myconsole.setcolor(myconsole.colors.white)
webservice.start()
mongodb.open()