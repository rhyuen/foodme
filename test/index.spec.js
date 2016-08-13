 var mocha = require("mocha");
var chai = require("chai");
var chaiHttp = require("chai-http");
var server = rquire("../server.js");
var chai = require("chai").should();


chai.use(chaiHttp);

describe("Routes should work.", function(){
  it("should be 200", function(done){
    chai.request(server)
      .get("/")
      .end(function(req, res){
        res.should.have.status(200);
        done();
      });
  });

  describe("Data should be Returned based on POST", function(){
    it("Should return YELP Data", function(done){
      done();
    });

    it("Should return ZOMATO Data", function(done){
      done();
    });
  });
});
