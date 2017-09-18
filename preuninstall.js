#!/usr/bin/env node

var isWin = /^win/.test(process.platform);
if( !isWin ) return;

var exec = require('child_process').exec;

console.log('Removing contextual menus...');

exec('cmd /c orsys_menu_remove.reg');




