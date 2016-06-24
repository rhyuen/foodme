var nconf = require("nconf");

nconf.file("config.json");

module.exports = {
  yelp_consumer_key: process.env.yelp_consumer_key || nconf.get("yelp_consumer_key"),
  yelp_consumer_secret: process.env.yelp_consumer_secret ||nconf.get("yelp_consumer_secret"),
  yelp_token: process.env.yelp_token || nconf.get("yelp_token"),
  yelp_token_secret: process.env.yelp_token_secret || nconf.get("yelp_token_secret")
};
