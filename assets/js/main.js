var apiURL = 'http://52.57.228.6/man2API/php/BankPhp.php';
var apiKEY = 'fbecdb97d0ce2bc1f0a69d3e52562cd1';
var globCurrency = 'PETR1066';
var globBalance = 0;

$(document).ready(function () {
  reqAccountInfo();
  reqGetOffers();

  //make "Enter" trigger the sell button
  $("#sellInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#sellButt").click();
    }
  });
});
