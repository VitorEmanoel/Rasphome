const mongoose = require("mongoose");
const myconsole = require('../utils/console');
const colors = myconsole.colors;

const url = `mongodb://localhost/rasphome`;
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);


function start() {
    console.log(myconsole.colormessage('[Database] ', colors.yellow) + 'Iniciando...');
    mongoose.connect(url, {useNewUrlParser: true}).then(() => {
        console.log(myconsole.colormessage('[Database] ', colors.yellow) + 'Iniciado com sucesso ' + myconsole.colormessage('[OK]', colors.green))
    }).catch((err) => {
        console.log("Ocorreu um erro ao conectar com o banco de dados");
        console.error((err.message));
    });
}

function stop(){
    console.log(myconsole.colormessage('[Database] ', colors.yellow) + 'Desligando...');
    mongoose.disconnect().catch((err)=>{
       console.error("Ocorreu um erro ao desconectar do banco de dados ");
       console.error(err);
    });
    console.log(myconsole.colormessage('[Database] ', colors.yellow) + 'Desligando...');

}

module.exports.stop = stop;
module.exports.start = start;
