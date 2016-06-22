var request = require('request'); 		// requisições
var express = require('express');		// routes
var jsdom 	= require('jsdom');			// carrega response com JQuery 
var iconv  	= require('iconv-lite');	// encoding
var app 	= module.exports = express();
var URL 	= "http://sc.olx.com.br/florianopolis-e-regiao/leste/imoveis/aluguel";
var port 	= process.env.PORT || 3001;

try
{
	app.get('/', function(req, res) {
		res.send('Node app running.');
	});
	
	app.get('/olx', function(req, res){
		getOLX(res);
	});
	
	app.listen(port, function () {
		console.log('Example app listening on port ' + port);
	});
}
catch (e)
{
	console.log(e);
}

function getOLX(res) {
	// propriedades para request
	var reqOptions = {
			uri: URL,
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
						var content = '<table>';
						$.each(listLink, function(index, value) {
						  content += '<tr><td style=\'border-bottom: 1px solid lightgray;\'>' + value.title + '</td><td style=\'width: 100px; border-bottom: 1px solid lightgray;\'>' + $(value).find('.col-3').children().text() + '</td></tr>';
						});
						content += '</table>';
						res.send(content);
					}
				});
			}
	);
}
