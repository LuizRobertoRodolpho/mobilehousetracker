var request 	= require('request'); 		// requisições
var express 	= require('express');		// routes
var jsdom 		= require('jsdom');			// carrega response com JQuery 
var iconv  		= require('iconv-lite');	// encoding
var bodyParser  = require("body-parser");
var app 		= module.exports = express();
var URL 		= "http://sc.olx.com.br/florianopolis-e-regiao/leste/imoveis/aluguel";
var port 		= process.env.PORT;
var path    	= require("path");

try
{
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname + '/index.html'));
	});
	
	app.get('/olx', function(req, res){
		//getOLX(req, res);
	});	
	app.post('/olx',function(req, res){
		getOLX(req, res);
	});
	
	app.listen(port, function () {
		console.log('Example app listening on port ' + port);
	});
}
catch (e)
{
	console.log(e);
}

function getOLX(req,res) {
	// propriedades para request
	var reqOptions = {
			uri: req.body.URL,
			encoding: null
		};
		
	request(reqOptions, 
			function(err, response, body)
			{
				// error handling
				if(err && response.statusCode !== 200)
				{	
					console.log('Request error.');
				}
				
				// decoding
				body = new Buffer(body, 'binary');
				body = iconv.decode(new Buffer(body), "ISO-8859-1");
				
				// parse
				jsdom.env({
					html: body,
					scripts: ['http://code.jquery.com/jquery-3.0.0.min.js'],
					done: function (err, window) {
						var $ = window.jQuery;
						var listLink = $(".OLXad-list-link" );
						var content = '<table style=\'color: #fff;\'>';
						
						$.each(listLink, function(index, value) {
							var priceText = $(value).find('.col-3').children().text();
							if (priceText)
							{
								var price = parseInt(priceText.substring(4, priceText.length).replace('.', ''));
								
								if (parseInt(req.body.MAX) >= price || !req.body.MAX)
								{
									content += '<tr><td style=\'border-bottom: 1px solid lightgray; font: 18px;\'>' + value.title + '</td><td style=\'width: 100px; border-bottom: 1px solid lightgray;\'>' + priceText  + '</td></tr>';
								}
							}
						});
						content += '</table>';
						
						res.send(content);
					}
				});
			}
	);
}
