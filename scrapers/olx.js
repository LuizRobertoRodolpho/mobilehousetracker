/* SCRAPER - OLX */
module.exports = function (request, jsdom, iconv, bodyParser, db) {
	var querystring = require('querystring');
	var module = {};
	
	// ** Futuramente normalizar com outros scrapers **
	var Property = function (id, title, price, regionid, url, createdTime) {
		var self = this;
		self.idolx = id;
		self.title = title;
		self.price = price;
		self.regionid = regionid;
		self.url = url;
		self.createdTime = createdTime;
		self.gatheredTime = new Date();
		return self;
	}

	module.getOLX = function (req,res) {
		// propriedades para request
		var reqOptions = {
			uri: req.body.REGION,
			encoding: null
		};
			
		// buscar lista do paginador (class module_pagination)

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
										content += '<tr><td style=\'border-bottom: 1px solid lightgray; font: 18px;\'>' + value.title + '</td><td style=\'width: 100px; border-bottom: 1px solid lightgray;\'>' + priceText  + '</td><td><a href=\"' + value.href + '\" target=\"_blank\"><img src=\"public/olx.jpg\" /></a></td></tr>';
										
										var p = new Property(value.id, value.title, price, value.href, '-');

										saveProperty(p);
									}
								}
							});
							content += '</table>';
							content += '<h1>Total: ' + listLink.length + '</h1>';
							
							res.send(content);
						}
					});
				}
		);
	}

	module.run = function (region, regionid, maxVal, callback)
	{
		var self = this;
		self.pendingRequests = new Array();
		self.scrapCallback = function (page) {
			module.scrapOLX_items(region, regionid, page, maxVal, function (success, page) {
				if (success === true)
				{
					self.pendingRequests.splice(self.pendingRequests.indexOf(page));
					console.log('pending requests: ' + self.pendingRequests.length);
					if (self.pendingRequests.length <= 0)
					{
						callback();
					}
				}
				else {
					self.scrapCallback(page);
				}
			});
		}

		module.scrapOLX_pagination(region, maxVal, function (pages) {
			if (isNaN(pages) || pages == 0)
				callback();
			else
			{
				for (var i = 1; i <= pages; i++)
				{
					self.pendingRequests.push(i);
					self.scrapCallback(i);
				}
			}
		});
	}

	module.scrapOLX_items = function (region, regionid, page, maxVal, callback)
	{
		try
		{
			// propriedades para request
			var reqOptions = {
				uri: region,
				qs: { 
					o: page.toString(),
					pe: maxVal.toString()
				},
				method: "GET",
				headers: {'User-Agent': 'request'},
				timeout: 15000,
				encoding: null
			};

			// verifica região e numero de paginação
			request(reqOptions, function(err, response, body) {
				// error handling
				if (err/*&& response.statusCode !== 200*/)
				{	
					console.log('Request error (' + page + ')');
					callback(false, page);
				}
				else
				{						
					// decoding
					body = new Buffer(body, 'binary');
					body = iconv.decode(new Buffer(body), "ISO-8859-1");
					
					if (body)
					{
						// parse
						jsdom.env({
							html: body,
							scripts: ['http://code.jquery.com/jquery-3.0.0.min.js'],
							done: function (err, window) {
								var $ = window.jQuery;
								var listLink = $(".OLXad-list-link");
								var itemsToSave = new Array();

								//console.log('Items found: ' + listLink.length);
								
								$.each(listLink, function(index, value) {
									var priceText = $(value).find('.col-3').children().text();
									if (priceText)
									{
										var price = parseInt(priceText.substring(4, priceText.length).replace('.', ''));
									
										itemsToSave.push(new Property(value.id, 
															value.title,
															price,
															regionid, 
															value.href, '-'));
									}
								});

								if (itemsToSave.length > 0)
								{
									saveProperties(itemsToSave, function () {
										callback(true);
									});
								}
							}
						});
					}
					else {
						callback(false, page);
					}
				}
			});
		}
		catch (e)
		{
			console.log(e.message);
			callback(false, page);
		}
	}

	module.scrapOLX_pagination = function (url, maxVal, callback)
	{
		var path = url;
		// propriedades para request
		if (!isNaN(parseInt(maxVal)))
		{
		 	path += '?' + 'pe=' + maxVal; 
		}
		var reqOptions = {
			uri: path,
			method: "GET",
			headers: {'User-Agent': 'request'},
			timeout: 15000
		};

		// verifica região e numero de paginação
		request(reqOptions, 
				function(err, response, body)
				{
					// error handling
					if(err /*&& response && response.statusCode !== 200*/)
					{	
						console.log('Pagination request error.');
						callback();
					}
					else
					{					
						// decoding
						body = new Buffer(body, 'binary');
						body = iconv.decode(new Buffer(body), "ISO-8859-1");
						
						if (body)
						{
							// parse
							jsdom.env({
								html: body,
								scripts: ['http://code.jquery.com/jquery-3.0.0.min.js'],
								done: function (err, window) {
									var $ = window.jQuery;
									if ($ === undefined) {
										console.log('Pagination request error.');
										callback();
									}

									var pageNum = $(".module_pagination").find('.item.number').length;
									callback(pageNum);
								}
							});
						}
						else {
							callback();
						}
					}
				}
		);		
	}

	function saveProperties(objects, callback) {
		try
		{
			var bulk = db.property.initializeOrderedBulkOp();

			db.counter.findOne({ _id: 'propertyid' }, 
				function(err, res) {
					if (err)
					{
						console.log(err);
						callback();
					}
					var lastIndex = res.seq;

					for (var i in objects)
					{
						objects[i]._id = lastIndex + parseInt(i);
						bulk.find({idolx: objects[i].idolx}).upsert().updateOne(objects[i]);
					}			
			
					bulk.execute(function (err, res2) {
						if (err){
							console.log(err.message);
							callback();
						}
						else {
							if (res2.nUpserted > 0)
							{
								db.counter.update(
									{ _id: 'propertyid' },
									{ $inc: { seq: res2.nUpserted }},
									function(err, res3) {
										callback();
									});
							}
							else {
								callback();
							}
						}
					});
				});
		}
		catch (e)
		{
			console.log(e);
		}
	}	

	function getNextSequence(name) {
		var ret = db.counter.findAndModify(
				{
					query: { _id: name },
					update: { $inc: { seq: 1 } },
					new: false,
            		upsert: true
				}
		);

		return ret.seq;
	}

	/// Insert new item found
	function saveProperty(obj)
	{
		db.property.find({idolx: obj.idolx}, function (err, res){
			if (res.length == 0)
			{
				db.property.insert(obj, function (err){
					if (err)
						console.log(err);
				});
			}
			else
			{
				console.log(obj.IdOLX + ' already exists.');
			}
		});
	}

	return module;
}