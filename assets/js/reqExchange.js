// get exchange rate req: ~?what=exchange_rate&from={currency}&to={currency}&apikey={key}
function reqExchange(cellID, toCurrency) {
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

         //store the exchange rate
         var exchange_rate = jsonObj.data.amount;
         var rate = Number(exchange_rate/100).toFixed(2);

         // select the offer cell
         var td = $('#' + cellID);
         td.append(rate);

         if (rate > 1) {
           td.addClass('verde');
         }
         else {
           td.addClass('rosu');
         }
      }
    });
}
