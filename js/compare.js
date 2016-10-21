//shebang
// #!/usr/bin/env node
//experimentell, needs to be required in the bi field in package json
//this should be done later on, after you finished the other things
var gm = require('gm');
gm.compare = require('./gm_compare.js')(gm.prototype);
var color = require('bash-color'); 

//imports
var myScreens = require('./screens.js');

//own var
var resindex = 0;
var count = 0;
var resPath = './results/';
var resName = 'diffImg';
var resEnding = '.jpg'


function compareImgFullReport(baseImg, newImg){
	gm.compare(baseImg, newImg, function(err,isEqual, equality, raw){
		if(err){
			throw err;
		}
		console.log('-----REPORT: IMG '+baseImg+'COMPARED TO '+newImg+'-------------');
		console.log("IsEqual: ", isEqual);
		console.log("equality: ", equality);
		console.log("raw: ", raw);
		console.log('--------------------------------------\n\n')

	});
};


function createDifferImg(baseImg, newImg, count){
	var resultPathMade = ''+resPath+resName+count+resEnding;
	var options = {
		file: resultPathMade,
		highlightStyle: 'xor',
		highlightColor: 'yellow'
		//metric: 'psnr'		//needs to be arg to pass, rewrite gm's compare.js
		}
		gm.compare(baseImg, newImg, function(err, isEqual, equality, raw){
		if(err){
			throw err;
		}
		// !=0 instead trying to approach the float(->discuss in theory)
		if(equality != 0 ){
			//console.log('from differImg');
			gm.compare(baseImg, newImg, options, function(err){
				if(err){
					throw err;
				}
				console.log(color.red('es trat eine Abweichung auf zwischen '+baseImg+' und '+newImg));
		 		console.log(color.yellow('Das Differenzbild liegt in: ./results'));
		});	
		}
		else{
			console.log(color.green('es gab keine Abweichung zwischen '+baseImg+' und '+newImg));
		}
	})
};


exports.createDifferImg = createDifferImg;
exports.compareImgFullReport = compareImgFullReport;