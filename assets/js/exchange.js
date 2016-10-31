// Functionality for getting exchange rates

// get exchange rate req: ~?what=exchange_rate&from={currency}&to={currency}&apikey={key}
function handleExchangeButt() {
  if ($.trim($('#exchangeInput').val()).length) {
   var toCurrency = $('#exchangeInput').val();

   $.ajax({
      'url' : apiURL,
      'type' : 'GET',
      'data' : {
        'what' : 'exchange_rate',
        'from' : globCurrency,
        'to' : toCurrency,
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
          "what":"exchange_rate",
          "data":{
             "from":"luca0526",
             "to":"vict1074",
             "amount":"100"
          }
        }
        */

         console.log("Exchange object received:");
         console.log(jsonObj);

         try {
           var responseCode = jsonObj.resp.code;
           if (responseCode == 200) {
             var exchange_rate = jsonObj.data.amount;
             var rate = Number(exchange_rate/100).toFixed(6);

             $("#exchangeRate h3").html("1 " + globCurrency + " = " + rate + " " + toCurrency);
           }
         }
         catch(err) {
           $("#exchangeRate h3").html('');

           var alert = createAlert('alert-danger', 'This is not a valid currency! Please try again.');
           $('#exchangeBox').append(alert);
           setTimeout(function() {alert.hide();}, 4000);
         }
      }
    });
  }

  else {
    $("#exchangeRate h3").html('');

    var alert = createAlert('alert-warning', 'Please make sure you fill the <strong>currency</strong> for the exchange rate!');
    $('#exchangeBox').append(alert);
    setTimeout(function() {alert.hide()}, 4000);
  }
}
