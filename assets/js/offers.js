// Functionality for showing the available offers

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
         var offerID = current.id;
         var row = $('<tr id="' + offerID + '">');
         var keysByIndex = Object.keys(current);

         for (var i = 0; i < keysByIndex.length; i++) {
           var cellData = current[keysByIndex[i]];
           row.append($("<td>" + cellData + "</td>"));
         }

         var buyButt = $('<button class="btn btn-success buy-butt" type="button" onclick="handleBuyButt(' + offerID + ')">Buy</button>');
         row.append(buyButt);

         $('#offersTable tbody').append(row);
       })
    }
  });
}
