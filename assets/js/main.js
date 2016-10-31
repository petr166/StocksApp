var apiURL = 'http://52.57.228.6/man2API/php/BankPhp.php';
var apiKEY = 'fbecdb97d0ce2bc1f0a69d3e52562cd1';
var globCurrency = 'PETR1066';
var globBalance = 0;

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

       var currency = jsonObj.data[0].currency;
       var amount = jsonObj.data[0].amount;

       $('#currency').html(" " + currency);
       $('#balance').html(" " + amount);
       $('#sellAddOn').html("<strong>" + currency + "</strong>");
       $('#exchangeAddOn').html("<strong>" + currency + "</strong>" + " to");
       globBalance = Number(amount);
    }
  });
}

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

//SELL button click handle
function handleSellButt() {
  if ($.trim($('#sellInput').val()).length) {
    var amount = Number($('#sellInput').val());

    if (amount <= globBalance) {
      reqSellOffer(amount);
      $('#sellInput').val('');
    }
    else {
      var alert = createAlert('alert-danger', 'Your balance is too <strong>low</strong> to place this sell offer!');
      $('#sellBox').append(alert);
      $('#sellInput').val('');
      setTimeout(function() {alert.hide()}, 4000);
    }
  }

  else {
    var alert = createAlert('alert-warning', 'Please make sure you fill the <strong>amount</strong> for the sell offer!');
    $('#sellBox').append(alert);
    setTimeout(function() {alert.hide()}, 4000);
  }
 }

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
          var alert = createAlert('alert-success', '<strong>Your sell offer was succesfuly placed!</strong>');
          $('#sellBox').append(alert);
          reqAccountInfo();
          setTimeout(function() {alert.hide();}, 4000);
        }
      }
      catch(err) {
        var alert = createAlert('alert-danger', 'The transaction <strong>failed</strong>! Please try again later!');
        $('#sellBox').append(alert);
        setTimeout(function() {alert.hide();}, 4000);
      }
     }
   });
 }

 // get sell offers req: ~?what=offers&apikey={key}
 function reqGetOffers() {
   $.ajax({
     'url' : apiURL,
     'type' : 'GET',
     'data' : {
       'what' : 'offers',
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
            "name":"NICO381M",
            "apikey":"***********"
         },
         "what":"offers",
         "data":[
            {
               "id":"1",
               "amount":"23.24",
               "currency":"DENN5111",
               "since":"2016-10-23 21:57:16"
            },
            {
               "id":"2",
               "amount":"1.36",
               "currency":"NICO381M",
               "since":"2016-10-23 21:58:41"
            }
         ]
       }
       */

        console.log("Offers object received:");
        console.log(jsonObj);

        var offers = jsonObj.data;

        $('#offersTable tbody').html('');
        offers.forEach(function(current) {
          var row = $("<tr>");
          var keysByIndex = Object.keys(current);

          for (var i = 0; i < keysByIndex.length; i++) {
            var cellData = current[keysByIndex[i]];
            row.append($("<td>" + cellData + "</td>"));
          }

          var offerID = current.id;

          var buyButt = $('<button class="btn btn-success" type="button" onclick="handleBuyButt(' + offerID + ')">Buy</button>');
          row.append(buyButt);
          var successBuyAlert = createAlert('alert-success', 'Congratulations! The offer was succesfuly bought!');
          row.append(successBuyAlert);

          $('#offersTable tbody').append(row);
        })
     }
   });
 }

 // get exchange rate req: ~?what=exchange_rate&from={currency}&to={currency}&apikey={key}
 function handleExchangeButt() {
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

        // CHECK FOR RESPONSE CODE with try->catch

        var exchange_rate = jsonObj.data.amount;
        var rate = Number(exchange_rate/100).toFixed(6);

        $("#exchangeRate h3").val('');
        $("#exchangeRate h3").html("1 " + globCurrency + " = " + rate + " " + toCurrency);
     }
   });
 }

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
     }
   });
 }
