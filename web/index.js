require('dotenv').config();
const myconsole = require('../utils/console');
const colors = myconsole.colors;
const createError = require('http-errors');
const express = require("express");
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const secretKey = require('../config/config').secret_key;

const actuatorsRouter = require('./routes/actuators');
const sensorsRouter = require('./routes/sensors');
const indexRouter = require("./routes/index");
const roomsRouter = require("./routes/rooms");
const authRouter = require("./routes/auth");

let app = express();

let server;

let middlewareLog = (req, res, next) => {
    let date = new Date();
    console.log(`[${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] ${req.method} ${req.connection.remoteAddress} ${req.url}`);
    next();
};

let cors = (req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    next();
};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(middlewareLog);
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(secretKey));
app.use(session({
    key: 'user_token',
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie:{

    }
}));
app.use("/api/actuators", actuatorsRouter);
app.use("/api/sensors", sensorsRouter);
app.use("/api/rooms", roomsRouter);
app.use("/auth", authRouter);
app.use((req, res, next)=>{
    if(!req.session.token)
        res.clearCookie('user_token');
    next();
});
app.use("/", indexRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

app.use((err, req, res, next) =>{
    res.locals.message = err.message;
    res.locals.error = process.env.MODE === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
    console.error(err.toString());
});

function start(){
    myconsole.resetcolor();
    console.log(myconsole.colormessage('[WebService] ', colors.yellow) + 'Iniciado... ');
    server = app.listen(8080, (err) =>{
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
