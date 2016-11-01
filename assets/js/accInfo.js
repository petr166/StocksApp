// account information req: ~?what=account_info&apikey={key}
function reqAccountInfo() {
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

       //store the currency and balance
       var currency = jsonObj.data[0].currency;
       var amount = Number(jsonObj.data[0].amount).toFixed(2);
       console.log("AMOUNT: "+ amount);

       //display account info
       $('#currency').html(currency);
       $('#balance').html(amount);
       $('#sellAddOn').html("<strong>" + currency + "</strong>");
       $('#exchangeAddOn').html("<strong>" + currency + "</strong>" + " to");
       globBalance = Number(amount);
    }
  });
}
