var request 	= require('request'); 		// requisições
//var http		= require('http');
var express 	= require('express');		// routes
var jsdom 		= require('jsdom');			// carrega response com JQuery 
var iconv  		= require('iconv-lite');	// encoding
var bodyParser  = require("body-parser");
var app 		= module.exports = express();
var serv 		= require('http').Server(app);
//var URL 		= "http://sc.olx.com.br/florianopolis-e-regiao/leste/imoveis/aluguel";
var port 		= process.env.PORT || 3000;
var path    	= require("path");
var mongojs 	= require('mongojs');
var db 			= mongojs('localhost:27017/houseTracker', ['user', 'filter', 'property', 'counters']);
var phantomjs 	= require('phantomjs-prebuilt');
var binPath 	= phantomjs.path;

// project scripts
var sockets     = require('./custom_modules/sockets')(serv, db);
var scraperOLX  = require('./scrapers/olx')(request, jsdom, iconv, bodyParser, db);
var scraperZAP  = require('./scrapers/zap')(phantomjs, binPath, db);

try
{
	//http.globalAgent.maxSockets = 5;

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use('/public', express.static(__dirname + '/public'));

	app.get('/client', function(req, res){
		res.sendFile(path.join(__dirname + '/client.html'));
	});

	app.get('/', function(req, res){
		res.sendFile(path.join(__dirname + '/dashboard.html'));
	});

	app.post('/olx',function(req, res){
		scraper.getOLX(req, res);		
	});
	
	serv.listen(port, function () {
		console.log('Example app listening on port ' + port);
		poolingOLX();
		poolingZAP();
	});
}
catch (e)
{
	console.log(e);
}

var queueOLX = new Array();
var queueZAP = new Array();

/*  CONSIDERAÇÕES
    -------------------------------------------------------------------------------------
    Para cada site, iniciar o pooling específio.
	Checar se o filtro possui a flag para o site.
*/
var poolingOLX = function () {	
	setInterval(function() {
			var filters = db.filter.find({active: true, scrapOLX: true}, (err, res) => {
				if (res.length > 0)
				{
					for (var i in res) {	
						var filter = res[i];
						if (queueOLX.length == 0 || queueOLX.indexOf(filter.uid) == -1)
						{
							queueOLX.push(filter.uid);
							console.log('[OLX>' + filter.uid + '] started')
							new scraperOLX.run(filter.region, filter.regionid, filter.maxval, 
								function (){
									queueOLX.splice(queueOLX.indexOf(filter.uid), 1);
									sockets.notifyCycle(filter.uid);
									console.log('[OLX>' + filter.uid + '] finished')
							});
						}
						else {
							console.log('[OLX>' + filter.uid + '] already in progress')
						}
					}
				}
			});
	}, 15000);
}

var poolingZAP = function () {	
	setInterval(function() {
			var filters = db.filter.find({active: true, scrapZAP: true}, (err, res) => {
				if (res.length > 0)
				{
					for (var i in res) {	
						var filter = res[i];
						if (queueZAP.length == 0 || queueZAP.indexOf(filter.uid) == -1)
						{
							queueZAP.push(filter.uid);
							console.log('[ZAP>' + filter.uid + '] started')
							new scraperZAP.run(filter.region, filter.regionid, filter.maxval, 
								function (){
									queueZAP.splice(queueZAP.indexOf(filter.uid), 1);
									sockets.notifyCycle(filter.uid);
									console.log('[ZAP>' + filter.uid + '] finished')
							});
						}
						else {
							console.log('[ZAP>' + filter.uid + '] already in progress')
						}
					}
				}
			});
	}, 15000);
}