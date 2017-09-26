#!/usr/bin/env node


/**
 *  PACKAGES
*/

var program = require('commander'),
	path      = require('path'),
	fs      = require('fs'),
	open    = require("open");

/**
 *  VARIABLES
*/
var sep = path.sep;
var baseURL = 'https://interact2.responsys.net/interact/';
var view_url = 'formview/doit?';
var edit_url = 'formcab/FileEdit?uid=';
var file = false;

/**
 *  FUNCTIONS
*/

// Return an array with an array of folder directories, and the filename as string.
function parseFilename(file){
	var arr_filepath = file.split(sep);

	if(arr_filepath.length == 1){
		return [
			__dirname.split(sep), // Array of path sans filename
			file //Filename string sans path
		];
	}else{
		return [
			arr_filepath.slice(0, -1), // Array of path sans filename
			arr_filepath.slice(-1)[0] //Filename string sans path
		];
	}
}

/* Search and read "orsys.json" config file */
function get_rsys_path(paths){
	for(var i = paths.length; i >= 1; i--){
		var current_relative_path = paths.slice(i).join('/');
		current_relative_path += current_relative_path ? '/' : '';
		var search_path = paths.slice(0, i).join(sep) + sep;
		var data = get_rsys_data(search_path);	
		if(data){
			return data.root + '/' + current_relative_path;
		}
	}
	console.log('Missing "orsys.json" configuration file.\n\nType "orsys --help" for help.');
	return false;
}
/* Open and parse "orsys.json" config file */
function get_rsys_data(paths){
	var filepath = paths + 'orsys.json';
	try {
	  fileContents = fs.readFileSync(filepath);
	} catch (err) {
	  return false;
	}
	var obj = JSON.parse(fileContents, 'utf8');
	return obj;
}

/* Open the path in browser */
function open_browser_url(url){
	var browser = program.browser || false;
	open(url, browser);
}

function writeConfigFile(){
	var obj = {
		root: typeof program.initialize == 'boolean' ? 'contentlibrary' : program.initialize
	};	
	var json = JSON.stringify(obj);
	fs.writeFile('orsys.json', json, 'utf8');	
	console.log('"orsys.json" config file successfully created.');
}

function contextMenu(add){
	var exec = require('child_process').exec;
	if(add){
		exec('cmd /c orsys_menu_add.reg');
	}else{
		exec('cmd /c orsys_menu_remove.reg');
	}
}

/**
 *  SCRIPT
*/
program.arguments('<file>')
	.option('-e, --edit', 'Open the file on an edit windows in Responsys.')
	.option('-b, --browser <browserName>', 'Define the browser to be used to open the file (ex.: "chrome", "firefox").', '')
	.option('-i, --initialize [ResponsysRoot]', 'Creates the "orsys.json" configuration file in the current folder.')
	.option('-a, --win-contextmenu-add', 'Add Responsys contextual menu. Win only.')
	.option('-r, --win-contextmenu-remove', 'Remove Responsys contextual menu. Win only.')
	.action(function(param_file) {
		file = param_file;
		
	})
	.parse(process.argv);
	
	// console.log(JSON.stringify(program));

	//Create a configfile
	if(program.initialize){
		writeConfigFile();
		return;
	}
	
	//add contextual menu in Windows
	if(program.winContextmenuAdd){
		contextMenu(true);
		return;
	}
	
	//remove contextual menu in Windows
	if(program.winContextmenuRemove){
		contextMenu();
		return;
	}
	
	// Check for a valid filename
	if(!file){
		console.log('Missing file path.\n\nType "orsys --help" for help.');
		return false;
	}

	// Parse filename
	[paths, filename] = parseFilename(file); //Parse filename and path
	
	//Look for configfile.
	var rsys_paths = get_rsys_path(paths);
	if( !rsys_paths ){
		return;
	}

	//Open URL un browser
	open_browser_url(baseURL + ( program.edit ? edit_url : view_url ) + rsys_paths + '^' + filename);
