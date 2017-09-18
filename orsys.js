#!/usr/bin/env node

var program = require('commander'),
	path      = require('path'),
	fs      = require('fs'),
	open    = require("open");

// Get current file name and path
program.arguments('<file>')
	.option('-e, --edit', 'Open the file in edit an windows in Responsys')
	.option('-b, --browser <browserName>', '(optional) the application to be used to open the file (for example, "chrome", "firefox")')
	.action(function(file) {
		
		[paths, filename] = parseFilename(file); //Parse filename and path
		
		//Look for rsys.ini in array of paths.
		var rsys_path = get_rsys_path(paths);
		
		if( !rsys_path ){
			return;
		}
		
		var baseURL = 'https://interact2.responsys.net/interact/formview/doit?';
		if( program.edit ){
			baseURL = 'https://interact2.responsys.net/interact/formcab/FileEdit?uid=';
		}
		
		
		open_browser_url(baseURL + rsys_path + '^' + filename);
		
	})
	.parse(process.argv);


	
// Return an array with an array of folder directories, and the filename as string.
function parseFilename(file){
	var arr_filepath = file.split(path.sep);
	return [
		arr_filepath.slice(0, -1), // Array of path sans filename
		arr_filepath.slice(-1)[0] //Filename string sans path
	];
};

function get_rsys_path(paths){
	
	for(var i = paths.length; i >= 1; i--){
		var current_relative_path = paths.slice(i).join('/');
		current_relative_path += current_relative_path ? '/' : '';
		var search_path = paths.slice(0, i).join(path.sep) + path.sep;
	
		var data = get_rsys_data(search_path);
		
		if(data){
			return data.root + '/' + current_relative_path;
		}
	}
	
	console.log("File 'orsys.json' not found!");
	
	return false;
}

function get_rsys_data(path){
	var filepath = path + 'orsys.json';
	try {
	  fileContents = fs.readFileSync(filepath);
	} catch (err) {
	  return false;
	}
	
	var obj = JSON.parse(fileContents, 'utf8');
	return obj;
}



// Open the path in browser
function open_browser_url(url){
	var browser = program.browser || false;
	open(url, browser);
}
