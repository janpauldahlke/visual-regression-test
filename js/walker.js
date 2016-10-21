//requires node mods
var fs = require('fs');
var path = require('path');

//--npm modules
var walk = require('walk');

//--own vars
var base = './baseline/'; //dir baseline
var test = './testline/'; // dir testline
var res = './results/'; // dir result
var options = null;		//options

//----------------------------------------


//--File Walker---------------------------
var walks =	function(dir){
	var fileAr = [];
	var walker = walk.walk(dir, options);
	

	walker.on('file', function(root, fileStats, next){
		if(fs.existsSync(path.join(test,fileStats.name))){
			fileAr.push({
			 	base: base+fileStats.name,
			 	test: test+fileStats.name
			})
		}
		next();
		
	});
	walker.on('errors', function(root, nodeStatsArray, next){
		console.log('an error occured, goto next file');
		next();
	});
	return new Promise(function(resolve, reject){
		walker.on('end', function(){
		console.log('URL-Walker is complete');
		resolve(fileAr);
		});
	});
} 
//---------------------------------


//---exports-----------------------
exports.walks = walks;
//---------------------------------
