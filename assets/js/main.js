$(document).ready(function () {

  var apiURL = 'http://52.57.228.6/man2API/php/BankPhp.php';
  var apiKEY = 'fbecdb97d0ce2bc1f0a69d3e52562cd1';

  // account information req: ~?what=account_info&apikey={key}
  $.ajax({
    'url' : apiURL,
    'type' : 'GET',
    'data' : {
      'what' : 'account_info',
      'apikey' : apiKEY
    },

    // handle server response
    'success' : function(dataIN) {
      //create the JSON object
      var jsonObj = JSON.parse(dataIN);

      /* RESULT
      {
         "req":{
            "code":"200",
            "status":"OK",
            "method":"GET"
         },
         "user":{
            "name":"DENN5111",
            "apikey":"*****************"
         },
         "what":"account_info",
         "data":[
            {
               "amount":"100.00",
               "currency":"DENN5111"
            }
         ]
       }
       */

       console.log("Account info object received:");
       console.log(jsonObj);

       var currency = jsonObj.data[0].currency;
       var amount = jsonObj.data[0].amount;

       $('#currency').append(" " + currency);
       $('#amount').append(" " + amount);
       $('#sellAddOn').append(currency);
    }
  });

  // sell currency req: ~?what=sell&amount={##}&apikey={key}
  $.ajax({
    'url' : apiURL,
    'type' : 'GET',
    'data' : {
      'what' : 'account_info',
      'apikey' : apiKEY
    },

    // handle server response
    'success' : function(dataIN) {
      //create the JSON object
      var jsonObj = JSON.parse(dataIN);

      /* RESULT
      {
       "req":{
          "code":"200",
          "status":"OK",
          "method":"GET"
       },
       "user":{
          "name":"DENN5111",
          "apikey":"*****************"
       },
       "what":"sell",
       "data":{
          "id":"1",
          "amount":"23.24",
          "currency":"DENN5111",
          "since":"2016-10-23 21:57:16"
       }
     }
     */

     console.log("Sell offer object received:");
     console.log(jsonObj);


    }
  });

  //make "Enter" trigger the sell button
  $("#sellInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#sellButt").click();
    }
  });


});

//SELL button click handle
function handleSellButt() {
  if (!$.trim($('#sellInput').val()).length) {
    $('#emptyAlert').show();
  }
}
