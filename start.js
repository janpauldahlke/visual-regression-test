//später umbenennen in test und shebang hack nutzen um scripts mit . name aufrufen zu können
//windows != linux, normalerweise

//node modules imports-------------------
var path = require('path');
var fs = require('fs');
//-------------------------

//own modules imports-------------------
var walk = require('./js/walker.js');
var compare = require('./js/compare.js');
var help = require('./js/help.js');
var screens = require('./js/screens.js'); 
//--------------------------

//My own variables------------------
var base = './baseline'; //dir baseline
var test = './testline'; // dir testline
var res = './results'; // dir result

var fName = 'testbild';
var fIndex = 1;
var end = '.png';

var baseURLtxt = './baseline.txt';
var testURLtxt = './testline.txt';

var arrayHelper = [];
//--------------------------



//-helper-----------------------------

var checkDirIsEmpty = function(){
	if((fs.readdirSync(base).length == 0 )|| (fs.readdirSync(test).length == 0)){
		return false;
	}
	else{
		return true;
	}
};
//---------------------------


//EntryPoint----selfinvoking with ()---------------------
var caseDiffer = function(){
	var arg = process.argv[2];
switch(arg)
	{
	case 'createBaseline':
		console.log('createBaseline Screenshots');
		screens.loop(baseURLtxt, base);
		break;
	case 'createTestline':
		console.log('createTestline Screenshots');
		screens.loop(testURLtxt, test);
		break;
	case 'fullReport':
		if(checkDirIsEmpty()){
			console.log('fullReport');
			walk.walks(base).then(function(res){
				console.log(res);
				for(var val of res){
					compare.compareImgFullReport(path.join(val.base), path.join(val.test));
				}
			});
		}
		else{
			console.log('Either the directory of base or test is empty.\nConsider to run createBaseline or createTestline.');
		}
		break;
	case 'compareImage':
		console.log('compareImage');
		if(checkDirIsEmpty()){
			console.log('createDifferImg');
			walk.walks(base).then(function(res){
				//namecounter
				var count = 0;
				for(var value of res){
					compare.createDifferImg(value.base, value.test, count);
					count = count+1;
				}
			});
		}
		else{
			console.log('Either the directory of base or test is empty.\nConsider to run createBaseline or createTestline.');
		}
		break;
	case 'help':
		help.helps();	
		break;
	default:
		console.log('your input does not match any commands. Try typing: node start.js help');	
	}
}();
//--------------------------