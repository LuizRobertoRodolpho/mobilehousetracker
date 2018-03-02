/* SCRAPER - VIVA REAL */
module.exports = function (request, jsdom, iconv, bodyParser, db) {
    var module = {};

    // ** Futuramente normalizar com outros scrapers **
	var Property = function (id, title, price, regionid, url, createdTime) {
		var self = this;
		self.idviva = id;
		self.title = title;
		self.price = price;
		self.regionid = regionid;
		self.url = url;
		self.createdTime = createdTime;
		self.gatheredTime = new Date();
		return self;
	}

    return module;
}