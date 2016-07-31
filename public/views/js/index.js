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

if(navigator.geolocation){

  var map;
  navigator.geolocation.getCurrentPosition(function(position){
    $.post("/", {lat: position.coords.latitude, long: position.coords.longitude}, function(data){
      console.log(data);

      var myLatLng = {lat:  position.coords.latitude, lng: position.coords.longitude};

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

      }

      for(var i = 0; i < data.length; i++){
        var otherMarkers = new google.maps.Marker({
          position: {lat: data[i].gpsCoord.latitude, lng: data[i].gpsCoord.longitude},
          title: data[i].name,
          icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });
        otherMarkers.setMap(map);

        $("#restContent")
          .append($("<div/>", {class: "mdl-card mdl-shadow--2dp"})
          .append($("<div/>", {class: "mdl-card__title"})
          .append($("<h2/>", {class: "mdl-card__title-text", text: data[i].name})))
          .append($("<div/>", {class: "mdl-card__supporting-text", text: data[i].phone}))
          .append($("<div/>", {class: "mdl-card__actions mdl-card--border"})
          .append($("<a/>", {class: "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect", text: data[i].categories[0][0]})))
          .append($("<div/>", {class: "mdl-card__menu"})
          .append($("<button/>", {class: "mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"})
          .append($("<i/>", {class: "material-icons", text: "places"})))));

      }
    });
  });
}
