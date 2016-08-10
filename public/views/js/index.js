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

//Returned KM
function getDistanceBetweenGPSCoord(firstLat, firstLon, secondLat, secondLon){

  return "FillerValue";
}

if(navigator.geolocation){

  var map;
  navigator.geolocation.getCurrentPosition(function(position){
    $.post("/", {lat: position.coords.latitude, long: position.coords.longitude}, function(data){

      console.log(data);

      var myLatLng = {
        lat:position.coords.latitude,
        lng: position.coords.longitude
      };

      map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 15
      });

      var firstMarker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: "You're Here!"
      });

      function emphasizeMapMarker(){
        /*onclick,
            emph mapmarker,
            re centre map on it.
        */
      }

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

        $("#restContent")
          .append($("<div/>", {class: "mdl-card mdl-shadow--2dp"})
          .append($("<div/>", {class: "mdl-card__title"})
          .append($("<h2/>", {class: "mdl-card__title-text", text: zomato_listing.name})))
          .append($("<div/>", {class: "mdl-card__supporting-text", text: "PHONE NUMBER"})
          .append($("<p/>", {text: zomato_listing.location.address}))
          .append($("<p/>", {text: "Dist: " + getDistanceBetweenGPSCoord(1,1,1,1) + "m"}))
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
