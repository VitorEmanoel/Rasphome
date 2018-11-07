var csi = '\033[';
var color = '0m';

var colors = {
	black:'30m',
	red:'31m',
	green:'32m',
	yellow:'33m',
	blue:'34m',
	magenta:'35m',
	cyan:'36m',
	lightgray:'37m',
	darkgray:'30;1m',
	lightred:'31;1m',
	lightgreen:'32;1m',
	lightyellow:'33;1m',
	lightblue:'34;1m',
	lightmagenta:'35;1m',
	lightcyan:'36;1m',
	white:'37;1m',
};
var backgrounds = {
	black:'40m',
	red:'41m',
	green:'42m',
	yellow:'43m',
	blue:'44m',
	magenta:'45m',
	cyan:'46m',
	white:'47m',
}

function resetcolor(){
    color = '0m';
    process.stdout.write(csi + '0m')
}

function clear(){
    process.stdout.write('\033c')
}

function setcolor(pcolor){
    process.stdout.write(csi + pcolor);
    color = pcolor
}

function setbackground(pcolor){
    process.stdout.write(csi + pcolor)
}

function move(x, y){
    process.stdout.write(csi + '' + y + ';' + (x - 1) + 'H ')
}

function colormessage(message, pcolor){
    return csi + pcolor + '' + message + '' + csi + color;
	resetcolor();
}

function cursor(visible){
    if(visible){
        process.stdout.write('\u001b[?25h')
    }else{
        process.stdout.write('\u001b[?25l')
    }
}

module.exports.colormessage = colormessage;
module.exports.cursor = cursor;
module.exports.move = move;
module.exports.resetcolor = resetcolor;
module.exports.setbackground = setbackground;
module.exports.setcolor = setcolor;
module.exports.clear = clear;
module.exports.colors = colors;
module.exports.backgrounds = backgrounds;