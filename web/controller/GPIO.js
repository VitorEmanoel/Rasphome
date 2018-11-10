const { spawn } = require('child_process');
const path = require('path');
class GPIO{

    constructor(pin){
        this.pin = pin;
    }

    active(){
        return new Promise((sucess, reject) =>{
            try{
                const activeProcess = spawn('python3', ['scripts/python/actuatorControl.py', this.pin, 1]);
                sucess()
            }catch(err){
                reject(err);
            }
            
        });

    }

    deactive(){
        return new Promise((sucess, reject) =>{
            try{
                const deactiveProcess = spawn('python3', ['scripts/python/actuatorControl.py', this.pin, 0]);
                sucess()
            }catch(err){
                reject(err);
            }
        });
    }



}

module.exports = GPIO;
