/* SOCKETS */
module.exports = function (serv, db) {
	var io = require('socket.io')(serv,{});
	var module = {};
	var SOCKET_LIST = {};

	var User = function (socket) {
		var self = this;
		self.id = null;
		self.monitoring = false;
		self.socket = socket;
		return self;
	}

	var queryProperties = (uid, lastItemId, callback) => {
		//var regEx = "/" + filter.region + "/"; //contains region txt
		db.filter.findOne({uid: uid}, function (err, res){
			if (err)
			{
				console.log(err);
			}
			else {
				if (res)
				{
					var maxVal = parseInt(res.maxval);
					db.property.find({ 	
						_id: { $gt: lastItemId },
						price: 	{ $lte: maxVal }, 
						regionid: res.regionid }, 
						function (err, res) {
								if (err) {
									console.log(err);
									callback(new Array());
								} else {
									if (res && res.length > 0) {
										callback(res);
									}
									else {
										callback(new Array());
									}
								}
							});
				} else {
					console.log('filter not found');
				}
			}
		});	
	}

	/// Save the user if it is a new
	var setUser = function (uid) {
		db.user.find({id: uid}, function (err,res) {
			if (res.length == 0) {
				db.user.insert({id: uid}, function (err) {
					console.log(err);
				});
			}
		})
	}
	/// Save user preferences
	var setFilter = function (data) {		
		if (!isNaN(parseInt(data.MAX)) != '' && !isNaN(parseInt(data.REGIONID)))
		{
			switch (data.REGIONID)
			{
				case "1":
					data.REGION = 'http://sc.olx.com.br/florianopolis-e-regiao/centro/imoveis/aluguel/';
					break;
				case "2":
					data.REGION = 'http://sc.olx.com.br/florianopolis-e-regiao/grande-florianopolis/imoveis/aluguel/';
					break;
				case "3":
					data.REGION = 'http://sc.olx.com.br/florianopolis-e-regiao/leste/imoveis/aluguel/';
					break;
				case "4":
					data.REGION = 'http://sc.olx.com.br/florianopolis-e-regiao/norte/imoveis/aluguel/';
					break;
				case "5":
					data.REGION = 'http://sc.olx.com.br/florianopolis-e-regiao/sul/imoveis/aluguel/';
					break;
			}

			var uid =	 data.UID;
			var maxVal = data.MAX;
			var region = data.REGION;
			var regionid = data.REGIONID;
			var scrapOLX = data.OLX;
			var scrapZAP = data.ZAP;
			var status = true;

			db.filter.find({uid: uid}, function (err, res) {
				if (res.length == 0) {
					db.filter.insert({
						uid: uid, 
						maxval: maxVal, 
						region: region,
						regionid: regionid,
            			scrapOLX: scrapOLX,
            			scrapZAP: scrapZAP,
						active: true
					}, function(err){
						if (err)
							console.log(err);
					});
				} else {
					db.filter.update(
						{ uid: uid },
						{
							$set: {
								maxval: maxVal, 
								region: region,
								regionid: regionid,
								scrapOLX: scrapOLX,
								scrapZAP: scrapZAP,
								active: status
							}
						}
					)
				}
			});	
		}
	}

	module.SOCKETLIST = function () {
		return SOCKET_LIST; 	
	};

	module.notifyCycle = (uid) => {
		for (var i in SOCKET_LIST){	
			var user = SOCKET_LIST[i];
			if (user.id == uid && user.monitoring === true)
			{
				// REWRITE getOLX, then insert and return diff count
				//user.socket.emit('cycleEnded', { success: true });
				user.socket.emit('cycleCompleted');
			}
		}
	}

	io.sockets.on('connection', function (socket) {
		socket.id = Math.random();
		SOCKET_LIST[socket.id] = User(socket);

		console.log('connection opened: ' + socket.id);

		socket.on('activate', function(data) {
			SOCKET_LIST[socket.id].id = data.id;
			SOCKET_LIST[socket.id].monitoring = true;
			console.log('monitor activated');
		});
		socket.on('deactivate', function() {
			/* 	Quando a conexão do usuário é fechada, estamos desativando a flag de monitoramento, 
				mas não deverá ser no futuro, apenas quando o usuário sinalizar via CLIENT, pois
				o sistema de notificações para mobile ou SMS deverão ficar reportando novas ocorrências.
			*/
			SOCKET_LIST[socket.id].monitoring = false;
			console.log('monitor deactivated');
		});
		socket.on('disconnect', function() {
			delete SOCKET_LIST[socket.id];
			console.log('disconnected ' + socket.id);
		});
		socket.on('getProperties', (data) => {
			for (var i in SOCKET_LIST){	
				var user = SOCKET_LIST[i];
				if (user.monitoring === true && user.id == data.userid)
				{
					// REWRITE getOLX, then insert and return diff count
					queryProperties(user.id, data.lastItemId,  (result) => {						
						user.socket.emit('propertiesResult', { 
							result: result
						});
					});
				}
			}
		});
		socket.on('applyFilter', function(data) {
			if (!isNaN(data.UID))
			{
				setUser(data.UID);
				setFilter(data);
			}
		});
	});

	var pool = setInterval(function() {
		for (var i in SOCKET_LIST){	
			var user = SOCKET_LIST[i];
			if (user.monitoring === true)
			{
				// REWRITE getOLX, then insert and return diff count
				user.socket.emit('pingback', { success: true });
			}
		}
	}, 2000/*1000/25*/);

	return module;
}