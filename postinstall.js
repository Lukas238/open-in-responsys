#!/usr/bin/env node

var isWin = /^win/.test(process.platform);
if( !isWin ) return;

var exec = require('child_process').exec;

function prompt(question, callback) {
    var stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}

prompt('Add contextual menu for htm/html files? (Y/N)', function (input) {
	if( input.toLowerCase() == "y"){
		exec('cmd /c orsys_menu_add.reg', function(error, stdout, stderr){
			process.exit();
		});
	}else{
		console.log('nop');
		process.exit();
	}
});
