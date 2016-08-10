//index.js

function removeCopies(container){
  if(container.length === 1)
    return container;
  var caselessContainer = container.map(function(val){
    return val.toUpperCase();
  });
  return caselessContainer.filter(function(value, index, arr){
      return caselessContainer.indexOf(value) === index;
  });
}

//Returns in meters
function getDistanceBetweenGPSCoord(firstLat, firstLon, secondLat, secondLon){
  var EARTHRADIUS = 6371000;
  var deltaLat = (secondLat - firstLat)*Math.PI/180;
  var deltaLon = (secondLon - firstLon)* Math.PI/180;
  var firstLatRad = firstLat * Math.PI/180;
  var secondLatRad = secondLat * Math.PI/180;

  var a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
          Math.sin(deltaLon/2) * Math.sin(deltaLon/2) *
          Math.cos(firstLatRad) * Math.cos(secondLatRad);
  var curve = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return Math.ceil(EARTHRADIUS * curve);
}

if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position){
    $.post("/", {lat: position.coords.latitude, long: position.coords.longitude}, function(data){

      var hostLat = position.coords.latitude;
      var hostLon = position.coords.longitude;

      console.log(data);

      var myLatLng = {
        lat: hostLat,
        lng: hostLon
      };

      var map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 15
      });

      var firstMarker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: "You're Here!"
      });


      var yelp = data.yelp_data;

      yelp.map(function(yelp_listing){
        var otherMarkers = new google.maps.Marker({
          position: {
            lat: yelp_listing.gpsCoord.latitude,
            lng: yelp_listing.gpsCoord.longitude
          },
          title: yelp_listing.name,
          icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });
        otherMarkers.setMap(map);


        //TODO: On Click of Overlay, add Popup

        $("#restContent")
          .append($("<div/>", {class: "mdl-card mdl-shadow--2dp"})
          .append($("<div/>", {class: "mdl-card__title"})
          .append($("<h2/>", {class: "mdl-card__title-text", text: yelp_listing.name})))
          .append($("<div/>", {class: "mdl-card__supporting-text", text: yelp_listing.phone.substring(3)})
          .append($("<p/>", {text: yelp_listing.address[0]}))
          .append($("<p/>", {text: "Dist: " + Math.ceil(yelp_listing.relDistance) + "m"}))
          .append($("<p/>", {text: "Score: " + yelp_listing.cumulRating + "/5"})))
          .append($("<div/>", {class: "mdl-card__actions mdl-card--border"})
          .append($("<a/>", {class: "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect", text: yelp_listing.categories[0][0]})))
          .append($("<div/>", {class: "mdl-card__menu"})
          .append($("<button/>", {class: "mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"})
          .append($("<i/>", {class: "material-icons", text: "places"})))));
      });

      var zomato = data.zomato_data;
      zomato.map(function(zomato_listing){
        var zomato_markers = new google.maps.Marker({
          position: {
            lat: parseFloat(zomato_listing.location.latitude),
            lng: parseFloat(zomato_listing.location.longitude)
          },
          title: zomato_listing.name,
          icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
        });
        zomato_markers.setMap(map);

        var currZomatoGPStoDist = getDistanceBetweenGPSCoord(hostLat, hostLon, parseFloat(zomato_listing.location.latitude), parseFloat(zomato_listing.location.longitude));

        $("#restContent")
          .append($("<div/>", {class: "mdl-card mdl-shadow--2dp"})
          .append($("<div/>", {class: "mdl-card__title"})
          .append($("<h2/>", {class: "mdl-card__title-text", text: zomato_listing.name})))
          .append($("<div/>", {class: "mdl-card__supporting-text"})
          .append($("<p/>", {text: zomato_listing.location.address}))
          .append($("<p/>", {text: "Dist: " + currZomatoGPStoDist + "m"}))
          .append($("<p/>", {text: "Score: " + zomato_listing.rating.aggregate_rating + "/5 ("+ zomato_listing.rating.votes+" votes)"})))
          .append($("<div/>", {class: "mdl-card__actions mdl-card--border"})
          .append($("<a/>", {class: "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect", text: zomato_listing.categories})))
          .append($("<div/>", {class: "mdl-card__menu"})
          .append($("<button/>", {class: "mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"})
          .append($("<i/>", {class: "material-icons", text: "places"})))));
      });
    });
  });
}else{
  console.log("GPS Coords Permission Denied.");
  $("#map").append($("<p/>", {
    text: "Refresh the page and say 'Yes' when prompted or the site provides no benefit."
  }));
}
