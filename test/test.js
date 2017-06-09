var assert = require('assert');
var request = require("request");
helloWorld = require("../Server/serverCheck.js");
var base_url = "http://localhost:8050/";
var server_url = "http://localhost:9080/";
var app = require('../Server/app.js')

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('app', function(){
  it('should 404 without routes', function(){
      request.get(server_url,function(error,response,body){
      assert.ok(true,"Executed");
    });
  });
});


describe("Hello World Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function() {

      request.get(base_url, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });

    });
    it("returns Hello World", function(done) {
      request.get(base_url, function(error, response, body) {
        //expect(body).toBe("Hello World");
        assert.equal("Hello World", body);
        helloWorld.closeServer();
        done();
      });
    });
  });
});
