var Yelp = require("yelp");
var config = require("../config.js");

var yelp = new Yelp({
  consumer_key: config.yelp_consumer_key,
  consumer_secret: config.yelp_consumer_secret,
  token: config.yelp_token,
  token_secret: config.yelp_token_secret
});

var getYelpData = function(lat, lon, cb){

  var llcoord = lat + "," + lon;

  yelp.search({term: "restaurant", sort: 1, ll: llcoord})
  .then(function(data){
    var markersToBeSent = [];
    for(var i = 0; i < data.businesses.length; i++){
        var establishment = {
          name: data.businesses[i].name,
          categories: data.businesses[i].categories,
          phone: data.businesses[i].display_phone,
          address: data.businesses[i].location.display_address,
          postalcode: data.businesses[i].location.postal_code,
          gpsCoord: data.businesses[i].location.coordinate,
          cumulRating: data.businesses[i].rating,
          currStatus: data.businesses[i].is_closed,
          relDistance: data.businesses[i].distance
        };
        markersToBeSent.push(establishment);
    }
    return cb(null, markersToBeSent);

  })
  .catch(function(err){
    console.error(err);
    return cb(err, null);
  });
};

module.exports =  getYelpData;
