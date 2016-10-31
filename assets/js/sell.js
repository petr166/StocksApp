// Functionality for creating sell offers

// sell currency req: ~?what=sell&amount={##}&apikey={key}
function reqSellOffer(amount) {
  $.ajax({
    'url' : apiURL,
    'type' : 'GET',
    'data' : {
      'what' : 'sell',
      'amount' : amount,
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

     try {
       var responseCode = jsonObj.resp.code;
       if (responseCode == 200) { //the sell went ok
         //show the alert
         var alert = createAlert('alert-success', '<strong>Your sell offer was succesfuly placed!</strong>');
         $('#sellBox').append(alert);

         //update the account info and sell offers
         reqAccountInfo();
         setTimeout(reqGetOffers, 2000);
         setTimeout(function() {alert.hide();}, 4000);
       }
     }
     catch(err) { //bad server response
       //show the alert
       var alert = createAlert('alert-danger', 'The transaction <strong>failed</strong>! Please try again later!');
       $('#sellBox').append(alert);
       setTimeout(function() {alert.hide();}, 4000);
     }
    }
  });
}

//SELL button click handle
function handleSellButt() {
  if ($.trim($('#sellInput').val()).length) { //check the input box to be filled
    //store the value
    var amount = Number($('#sellInput').val());

    if (amount <= globBalance) { //check if u have enough money to place this offer
      reqSellOffer(amount); //place the sell offer
      $('#sellInput').val('');
    }

    else { //not enough money
      //show the alert
      var alert = createAlert('alert-danger', 'Your balance is too <strong>low</strong> to place this sell offer!');
      $('#sellBox').append(alert);
      $('#sellInput').val('');
      setTimeout(function() {alert.hide()}, 4000);
    }
  }

  else { //empty input box
    //show the alert
    var alert = createAlert('alert-warning', 'Please make sure you fill the <strong>amount</strong> for the sell offer!');
    $('#sellBox').append(alert);
    setTimeout(function() {alert.hide()}, 4000);
  }
 }
