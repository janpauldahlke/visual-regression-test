# t8y-vrt Visuelle Regressionstests
##+ Abschlussprojekt von Jan Dahlke für das Unternehmen t8y.com ein CLI Tool für Visuelle Regressionstests

##Prequisites

####node(server)
get and install from
https://nodejs.org/en/
I strongly suggest to use node Verion > 5 to avoid complications on Windows systems with long pathnames in nested node modules.

####Phantomjs (wird benutzt für die Screenshotfunktionalität)
Download phantomjs from here
http://phantomjs.org/download.html

####Graphicsmagick
download and install following
http://www.graphicsmagick.org/README.html

##Installation
- clone repo
- change dir to repo and type `npm install`

##Usage
1. `node start createBaseline`	- create the baseline Screenshots. To do this copy a file named baseline.txt containing all URLs into the root. To see this images goto dir /baseline
2. `node start createTestline`	- create the testline Screenshots. To do this copy a file named testline.txt containing all URLs into the root. To see these images goto dir /testline
3. `node start fullReport`		- writes the output of a compare to Screen. The metric follows mean-square-error and sums up the differences in the colorchannels. good for quick overview.
4. `node start compareImage`	- creates an image with marked differences in the dir /results, if there is a arithmetic difference between base- and testline image.
5. `node start help`			- a given help. Shows the commands to the user

##last words
Feel free to use and/or modify this project to your needs.




