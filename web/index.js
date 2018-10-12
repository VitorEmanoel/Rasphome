const myconsole = require('../utils/console');
const colors = myconsole.colors;
const createError = require('http-errors');
const express = require("express");
const path = require('path');

const actuatorsRouter = require('./routes/actuators');
const sensorsRouter = require('./routes/sensors');
const indexRouter = require("./routes/index");

let app = express();

let server;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/api/actuators", actuatorsRouter);
app.use("/api/sensors", sensorsRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

function start(){
    console.log(myconsole.colormessage('[WebService] ', colors.yellow) + 'Iniciando...');
    server = app.listen(80, function(err){
        if(err){
            throw err;
        }
        console.log(myconsole.colormessage('[WebService] ', colors.yellow) + 'Iniciado com sucesso ' + myconsole.colormessage('[OK]', colors.green))
    })
}

function stop(){
    console.log(myconsole.colormessage('[WebService] ', colors.yellow) + 'Desligando...');
    server.close();
    console.log(myconsole.colormessage('[WebService] ', colors.yellow) + 'Desligado com sucesso ' + myconsole.colormessage('[OK]', colors.green));
}

module.exports.start = start;
module.exports.stop = stop;