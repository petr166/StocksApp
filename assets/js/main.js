var apiURL = 'http://52.57.228.6/man2API/php/BankPhp.php';
var apiKEY = 'fbecdb97d0ce2bc1f0a69d3e52562cd1';
var globCurrency = 'PETR1066';
var globBalance = 0;

$(document).ready(function () {
  // get the acc info and sell offers
  reqAccountInfo();
  reqGetOffers();

  // update account-info and sell offers every 10 sec
  setInterval(reqAccountInfo, 10000);
  setInterval(reqGetOffers, 10000);


  //make "Enter" trigger the sell button
  $("#sellInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#sellButt").click();
    }
  });

  //make "Enter" trigger the exchange button
  $("#exchangeInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#exchangeButt").click();
    }
  });
});
