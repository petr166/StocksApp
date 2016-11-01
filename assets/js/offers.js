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
       offers = offers.reverse();

       $('#offersTable tbody').html('');

       //fill in the sell offers table
       offers.forEach(function(current) {
         var offerID = current.id; //store the offer ID
         var offerAmount = Number(current.amount).toFixed(2); //store the offer amount
         var row = $('<tr id="' + offerID + '">'); //create a new table row with the ID matching the offer ID
         var keysByIndex = Object.keys(current); //store the keys indexes to loop through the object's fields

         row.append($("<td>" + offerID + "</td>")); //append the ID cell
         row.append($("<td>" + offerAmount + "</td>")); //append the amount cell
         row.append($("<td>" + current.currency + "</td>")); //append the currency cell

         var cellID = 'rate_' + offerID; //create an ID for the rate cell(used to display the rate)
         row.append($('<td id="' + cellID + '"></td>')); //append the rate cell
         reqExchange(cellID, current.currency); //request the specific exchange rate

         //create the buy button, action triggered to the specific offerID
         var buyButt = $('<button class="btn btn-success buy-butt" type="button" onclick="handleBuyButt(' + offerID + ')">Buy</button>');
         row.append(buyButt);

         //append the new row to the table
         $('#offersTable tbody').append(row);
       })
    }
  });
}
