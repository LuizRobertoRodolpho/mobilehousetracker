var page = require('webpage').create();
page.open('https://www.zapimoveis.com.br/aluguel/casas/sc+florianopolis/', function(status) {
  console.log("Status: " + status);
  //console.log(JSON.stringify(process.argv));
  if(status === "success") {
    var returnVal = page.evaluate(function() {
      $('#btnLocacao').click();
      $('#divFaixaPreco').click();
      $('#typePrecoMax').val(1100); // valor maximo do imóvel process.argv[1].max
      $('#btnBuscar').click();
      return $('#location').val();  // << returnVal
    });
    
    page.render('example.png');
    
    console.log(returnVal);
    //phantom.exit();
  }
  phantom.exit();
});

// page.onLoadFinished = function() {
//   console.log("page.onLoadFinished");
//   printArgs.apply(this, arguments);
// };