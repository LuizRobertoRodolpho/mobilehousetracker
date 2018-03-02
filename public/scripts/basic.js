var socket = io();

socket.on('pingback', function(data) {
    $('#lastUpdate').text(new Date());
});

socket.on('cycleCompleted', function(data) {
    console.log('cycleCompleted');
    var lastItemId = clientViewModel.items.length > 0 ? clientViewModel.items[0]._id : -1;
    socket.emit('getProperties', { userid: filterViewModel.UID, lastItemId: lastItemId }); //substituir lastsync pelo datetime do imovel mais recente salvo no client
});

socket.on('propertiesResult', function(data) {
    if (data.result.length > 0)
    {
        if (clientViewModel.items.length > 0)
        {
            notificationsViewModel.addNotifications(data.result);
        }
        clientViewModel.addItems(data.result);
            console.log('New items: ' + data.result.length);
    }
});

function startMonitor() {
    applyFilters();		
}

function stopMonitor() {
    socket.emit('deactivate');
}

function getImoveis() {
    $("#loadingDiv").fadeIn("slow", function () { });
    var region = getRegion();
    $.ajax({
        dataType: "text",
        type: "POST",
        data: {
            REGION: region,
            MAX: $('#maxValueInput').val(),
            UID: uid
        },
        url: "http://localhost:3000/olx",
        success: function (data) {
            $('#itemsDiv').html(data);
            $("#loadingDiv").fadeOut("slow", function () {
                $("#itemsDiv").fadeIn("slow", function () {
                });
            });

        },
        error: function (e) {
            console.log(e);
            $("#loadingDiv").fadeOut("slow", function () { });
        }
    });
}

function applyFilters() {		
    var region = getRegion();
            
    // filter = {
    //     REGION: region,
    //     REGIONID: $("input:radio[name=region]:checked").val(),
    //     MAX: $('#valorMaximoInput').val(),
    //     UID: uid
    // };	

    localStorage.setItem("filter", JSON.stringify(filterViewModel._data));
    socket.emit('applyFilter', filterViewModel._data);
}

function getRegion() {
    var region;
    var index = parseInt($('#regionSelect').val());

    switch (index) {
        case 1:
            region = 'http://sc.olx.com.br/florianopolis-e-regiao/centro/imoveis/aluguel';
            break;
        case 2:
            region = 'http://sc.olx.com.br/florianopolis-e-regiao/continente/imoveis/aluguel';
            break;
        case 3:
            region = 'http://sc.olx.com.br/florianopolis-e-regiao/leste/imoveis/aluguel';
            break;
        case 4:
            region = 'http://sc.olx.com.br/florianopolis-e-regiao/norte/imoveis/aluguel';
            break;
        case 5:
            region = 'http://sc.olx.com.br/florianopolis-e-regiao/sul/imoveis/aluguel';
            break;
        default:
            region = 'http://sc.olx.com.br/florianopolis-e-regiao/imoveis/aluguel';
            break;
    }

    return region;
}

function checkStorage() {
    if (typeof (Storage) !== "undefined") {
        // filterViewModel.UID = localStorage.getItem("userid");
        // if (isNaN(filterViewModel.UID)) {
        //     filterViewModel.UID = getDateNow();
        //     localStorage.setItem("userid", uid);
        // }

        var filter = JSON.parse(localStorage.getItem("filter"));
        if (filter !== null && filter !== undefined) {
            filterViewModel.UID = filter.UID;
            filterViewModel.MAX = filter.MAX;
            filterViewModel.REGIONID = filter.REGIONID;
            filterViewModel.OLX = filter.OLX;
            filterViewModel.ZAP = filter.ZAP;
            //$('#valorMaximoInput').val();
            //$("input[name=region][value=" + filter.REGIONID + "]").prop('checked', true);
        } else {
            filterViewModel.UID = getDateNow();
            localStorage.setItem("filter", JSON.stringify(filterViewModel._data));
        }

        socket.emit('activate', { id: filterViewModel.UID });

        //getByRegion(uid);
    } else {
        window.alert('Sorry! No Web Storage support...');
    }
    
    //socket.emit('hi', { UID: uid });
}

function getDateNow() {
    now = new Date();
    year = "" + now.getFullYear();
    month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }

    return year + month + day + hour + minute + second;
}

function isoDateToObject(isoString) {
    //indexOf('ISODATE') > -1
    var date = new Date(isoString);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return dt + '/' + month + '/' + year;
}

/* -- VUE ---------------------------------------------------------------------- */
var filterViewModel = new Vue({
    el: '#filtrosDiv',
    data: {
        UID : '',
        MAX : '',
        MIN : '',
        REGION : '',
        REGIONID : '',
        OLX: '',
        ZAP: ''
        /*
        self.SitesArray = [0, 1, 2]
        */
    }
});

var notificationsViewModel = new Vue({
    el: '#navigationBar',
    data: {
        notifications: new Array()
    },
    methods: {        
        addNotifications: function (arr) {
            [].push.apply(this.notifications, arr);
            this.notifications = this.sortById(this.notifications);
        },
        sortById: function(arr) {
            return arr.sort(function(a, b){ return b._id - a._id });
        },
        clearNotifications: function() {
            this.notifications = new Array();
        }
    },
    computed: {
        total: function () {
            return this.notifications.length > 0 ? this.notifications.length : '';
        },
        hasNotifications: function () {
            return this.notifications.length > 0;
        }
    },
    filters: {
        formattedDate: function (value) {
            var isoDate = value;
            if (isoDate)
            {
                return isoDateToObject(isoDate);                
            }
            else {
                return '-';
            }
        }
    }
});

// Vue.filter('sortPrice', function (arr) {
//     return arr.sort(function(a, b){ return b.price - a.price });
// })

var clientViewModel = new Vue({
    el: '#resultsDiv',
    data: { 
        items: new Array()
    },
    methods: {
        addItem: function (i, p) {
            this.items.push({index: i, price: p});
            this.items = this.sortById(this.items);
        },
        addItems: function (arr) {
            [].push.apply(this.items, arr);
            this.items = this.sortById(this.items);
        },
        sortByPrice: function(arr) {
            return arr.sort(function(a, b){ return b.price - a.price });
        },
        sortById: function(arr) {
            return arr.sort(function(a, b){ return b._id - a._id });
        },
    },
    filters: {
        formattedDate: function (value) {
            var isoDate = value;
            if (isoDate)
            {
                return isoDateToObject(isoDate);                
            }
            else {
                return '-';
            }
        }
    }
});

$(document).ready(function () {
    $("#applyFilterButton").click(function () {
        startMonitor();
    });
    // $("#itemsDiv").fadeOut("slow", function () {
    // 	//getImoveis();
    // 	checkStorage();
    // });
    checkStorage();
});