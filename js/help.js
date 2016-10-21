//this will be the helpfile
//figlet is just for fun
var fig = require('figlet');
//spielerei einfärbung
//npm install bash-color
var color = require('bash-color'); 

var helps = function(){
	console.log(' ');
	console.log(' ');
	console.log(color.red('---------------------------------------------------------------'));
	fig('VRT - helpfile', function(err, data){
		if(err){
			throw err;
	}
	console.log(color.red(data));
	console.log(color.red('---------------------------------------------------------------'));
	console.log(color.green(' Introduction\n'));
	console.log('   This little app allows you to capture Screenshots');
	console.log('   from a given URL list.');
	console.log('   This list needs to be in the root dir and needs to be named: ');
	console.log(color.yellow('   baseline.txt'));
	console.log('   Then place another file in the root, the tesline and name it: ');
	console.log(color.yellow('   testline.txt\n'));
	console.log('    It is now possible to start the compare Process via CLI:');
	console.log(color.yellow('    node start.js <yourCommand>'))
	console.log(('    is what you need to type. '));
	console.log('    You can use the following commands: \n');
	console.log(color.yellow('     createBaseline'), color.white('     This creates the Baseline by a given URL list'));
	console.log(color.yellow('     createTestline'), color.white('     This creates the Testline by a given URL List'));
	console.log(color.yellow('     fullReport'), color.white('         Prints the Report of ImageComparisons to the screen'));
	console.log(color.yellow('     compareImage'), color.white('       Saves an image File with the differences marked'));
	});
}

exports.helps = helps; 

//2do write a good help file

