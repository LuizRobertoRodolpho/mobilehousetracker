/* SCRAPER - ZAP */
module.exports = function (phantomjs, binPath, db) {
    var module          = {};
    var path            = require("path");
    var childProcess    = require('child_process');

    // ** Futuramente normalizar com outros scrapers **
	var Property = function (id, title, price, regionid, url, createdTime) {
		var self = this;
		self.idzap = id;
		self.title = title;
		self.price = price;
		self.regionid = regionid;
		self.url = url;
		self.createdTime = createdTime;
		self.gatheredTime = new Date();
		return self;
	}

    module.run = function (region, regionid, maxVal, callback)
	{
        var childArgs = [
            path.join(__dirname, 'elune.js'),
            {
                region: region,
                max: maxVal
            }
            //'some other argument (passed to phantomjs script)'
        ]
        
        childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
            // handle results 
            callback();
        })
        // setTimeout(function() {
		//     callback();
        // }, 22000);
	}

    return module;
}

/*  CONSIDERAÇÕES
    -------------------------------------------------------------------------------------
    Não será possível fazer o scraping apenas com parse de urls.
    Precisa do PhantomJS e realizar as ações com javascripts no site (definir filtros, click no search, contar páginas).
    Para fins de implementação e teste, executar pelo CMD à partir do diretório do phantomjs.exe os scripts.js
    ex.: C:\Elune\Node\MobileHouseTracker\node_modules\phantomjs-prebuilt\lib\phantom\bin>phantomjs page_events.js
*/