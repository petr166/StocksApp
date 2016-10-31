var apiURL = 'http://52.57.228.6/man2API/php/BankPhp.php';
var apiKEY = 'fbecdb97d0ce2bc1f0a69d3e52562cd1';
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
       $('#sellAddOn').html(currency);
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
      $('#lowSellAlert').show();
      $('#sellInput').val('');
      setTimeout(function() {$('#lowSellAlert').hide();}, 4000);
    }
  }

  else {
    $('#emptySellAlert').show();
    setTimeout(function() {$('#emptySellAlert').hide();}, 4000);
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
          $('.alert').hide();
          $('#successSellAlert').show();
          reqAccountInfo();
          setTimeout(function() {$('#successSellAlert').hide();}, 4000);
        }
      }
      catch(err) {
        $('.alert').hide();
        $('#failSellAlert').show();
        setTimeout(function() {$('#failSellAlert').hide();}, 4000);
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

        offers.forEach(function(current) {
          var row = $("<tr>");
          var keysByIndex = Object.keys(current);

          for (var i = 0; i < keysByIndex.length; i++) {
            var cellData = current[keysByIndex[i]];
            row.append($("<td>" + cellData + "</td>"));
          }

          $('#offersTable tbody').append(row);
        })
     }
   });
 }
