//node fs
var fs = require('fs');
var path = require('path');
//readline
var LineByLine = require('line-by-line');
var color = require('bash-color'); 
//phantom
var phantom = require('phantom');

//---my-helper-variables--------
var name = '/testBild';
var end = '.jpeg';
var baseURLtxt = './baseline.txt';
//can be replaced by a different UA // check this later on!
//var userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36';
var userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0'
//----------------

//--helper function----

var writePath = function(base,name,indexNum,end){
    return base+name+indexNum+end
}
//-------------------


//--makescreen methode mit phantom instance-----------
var makeScreen = function (url, target, indexNum){

    //base wird hier zum Zielordner
    var phInstance = null;
    var sitepage = null;
    var base=target;
    phantom.create()
	.then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
	.then(page => {
       sitepage = page;
       //console.log('open is', url);
       page.setting('userAgent', userAgent);
       page.property('viewportSize', {width: 1920, height: 1080})
       return page.open(url);
    })
	.then( status => {
        if(status === 'success'){
            console.log('call page --> ', status);
            var completeFileName = writePath(base, name, indexNum, end);
                setTimeout(function(){
                    sitepage.render(completeFileName, {format: 'jpg', quality: '80'});
                    console.log(color.green('screenshot taken: '+ completeFileName));
                    sitepage.close()
                    phInstance.exit(); 
                }, 3000);
        }else{
            console.log(color.red('check http Status!'))
            sitepage.close();
            phInstance.exit();
        }
    })
   .catch(error => {
        console.log(error);
        phInstance.exit();
	});
}
//------------------

//do things by line from baseURLtxt
var loop = function(txt, target){
    var counter = 0;
    var line = new LineByLine(txt);
    //console.log(line);
    line.on('error', function(err){
    throw err;
    });
    line.on('line', function(line){
        console.log(line);
        makeScreen(line, target, counter);
        counter +=1;
        
    });
    line.on('end', function(){
        console.log('file is done');
    });
}

//--exports---------------------------
exports.loop = loop;
//------------------------------------

