const myconsole = require('../utils/console');
const colors = myconsole.colors;
const createError = require('http-errors');
const express = require("express");
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const secretKey = require('../config/config').secret_key;
const GPIO = require('./controller/GPIO');
const Actuator = require('../database/models/actuators');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const socketController = require('./controller/socketController')(io);
const actuatorsRouter = require('./routes/actuators');
const sensorsRouter = require('./routes/sensors');
const indexRouter = require("./routes/index");
const roomsRouter = require("./routes/rooms");
const authRouter = require("./routes/auth");

let middlewareLog = (req, res, next) => {
    let date = new Date();
    console.log(`[${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] ${req.method} ${req.connection.remoteAddress} ${req.url}`);
    return next();
};

let cors = (req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    return next();
};

let socketMiddleware = (req, res, next) =>{
    req.io = io;
    return next();
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(middlewareLog);
app.use(socketMiddleware);
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

io.on('connection', socket =>{
    socket.on('actuator', async (data)=>{
        const actuator = await Actuator.findOne({_id:data.id});
        const GPIOController = new GPIO(actuator.pin);
        (data.value === true ? GPIOController.active() : GPIOController.deactive()).then(io.emit('actuatorUpdate', data));
        actuator.value = data.value;
        await actuator.save();
    })
})


function start(){
    myconsole.resetcolor();
    console.log(myconsole.colormessage('[WebService] ', colors.yellow) + 'Iniciado... ');
    server.listen(8080, (err) =>{
        if(err){
            throw err;
        }
        console.log(myconsole.colormessage('[WebService] ', colors.yellow) + 'Iniciado com sucesso ' + myconsole.colormessage('[OK]', colors.green))
    });
}

function stop(){
    console.log(myconsole.colormessage('[WebService] ', colors.yellow) + 'Desligando...');
    server.close();
    console.log(myconsole.colormessage('[WebService] ', colors.yellow) + 'Desligado com sucesso ' + myconsole.colormessage('[OK]', colors.green));
}

module.exports.start = start;
module.exports.stop = stop;
