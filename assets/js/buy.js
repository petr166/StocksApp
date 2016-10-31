// Functionality for buying available offers

// buy offer req: ~?what=buy&offer={id}&apikey={key}
function handleBuyButt(offerID) {
 $.ajax({
    'url' : apiURL,
    'type' : 'GET',
    'data' : {
      'what' : 'buy',
      'offer' : offerID,
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
            "name":"SKYX0002",
            "apikey":"***************"
         },
         "what":"buy",
         "data":{
            "id":"2",
            "offerCurrency":"NICO381M",
            "buyCurrency":"SKYX0002",
            "amount":"1.36",
            "offerTime":"2016-10-23 21:58:41",
            "buyTime":"2016-10-23 22:02:12"
         }
      }
      */

       console.log("Buy object received:");
       console.log(jsonObj);

       var row = $('#' + offerID);

       try {
         var responseCode = jsonObj.resp.code;
         if (responseCode == 200) {
           row.addClass('success');

           setTimeout(reqGetOffers, 1500);
           setTimeout(reqAccountInfo, 1000);
         }
       }
       catch(err) {
         row.addClass('danger');

         setTimeout(reqGetOffers, 1500);
         setTimeout(reqAccountInfo, 1000);
       }

    }
  });
}
