const { spawn } = require('child_process');
class GPIO{

    constructor(pin){
        this.pin = pin;
    }

    active(){
        return new Promise((sucess, reject) =>{
            const deactiveProcess = spawn('python3', ['../scripts/python/active.py', `${this.pin}`]);
            deactiveProcess.on('data', (data) =>{
                if(data === 'True') sucess();
                reject();
            });
            deactiveProcess.stderr.on('data', (data) =>{
                if(data === 'True') sucess();
                reject();
            });
        });

    }

    deactive(){
        return new Promise((sucess, reject) =>{
            const deactiveProcess = spawn('python3', ['../scripts/python/deactive.py', `${this.pin}`]);
            deactiveProcess.on('data', (data) =>{
                if(data === 'True') sucess();
                reject();
            });
            deactiveProcess.stderr.on('data', (data) =>{
                if(data === 'True') sucess();
                reject();
            });
        });
    }



}

module.exports = GPIO;
