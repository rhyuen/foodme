var express = require("express");
var config = require("./config.js");
var yelp = require("./extapi/yelpapi.js");
var zomato = require("./extapi/zomato.js");
var async = require("async");

var router = express.Router();

router.get("/", function(req, res){
  res.render("index");
});

router.post("/", function(req, res){
  var userLat = req.body.lat;
  var userLon = req.body.long;


  // zomato(userLat, userLon, function(err, data){
  //   if(err) console.error(err);
  //   console.log(data);
  // });
  //
  // yelp(userLat, userLon, function(err, data){
  //   if(err) console.error(err);
  //   console.log(data);
  // });



  async.parallel({
    yelp_data: function(cb){
      yelp(userLat, userLon, cb);
    },
    zomato_data: function(cb){
      zomato(userLat, userLon, cb);
    }
  }, function(err, results){
    if(err)
      console.log(err);
    console.log(results);
    res.send(results);
  });
});

module.exports = router;
