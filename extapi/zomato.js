var request = require("request");
var config = require("../config.js");

var getZomatoData = function(lat, lon, cb){
  var userLat = "lat=" + lat;
  var userLon = "lon=" + lon;
  var apiUrl = "https://developers.zomato.com/api/v2.1/geocode?" +userLat+  "&" + userLon;

  var options = {
    url: apiUrl,
    headers: {"user-key": config.zomato_key}
  };

  var zomatoList = [];

  request(options, function(err, status, data){
    if(err) return cb(err, null);
    var handled = JSON.parse(data);

    for(key in handled.nearby_restaurants){
      var currRestaurant = handled.nearby_restaurants[key].restaurant;

      var currZomato = {
        name: currRestaurant.name,
        location: currRestaurant.location,      //obj
        categories: currRestaurant.cuisines,
        rating: currRestaurant.user_rating,      //obj
        image: currRestaurant.featured_image
      };

      zomatoList.push(currZomato);
    }

    return cb(null, zomatoList);
  });
};

module.exports = getZomatoData;
