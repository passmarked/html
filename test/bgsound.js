// modules
var assert      = require('assert')
var _           = require('underscore')
var fs          = require('fs');
var passmarked  = require('passmarked');
var pluginFunc  = require('../lib/rules/plugins/applets');

describe('bgsound', function(){

  // handle the settings
  it('Should not return a error error if <bgsound /> is present', function(done){

    // create a dummy payload
    payload = passmarked.createPayload(
      {

        url: 'http://example.com'

      },
      {},
      fs.readFileSync('./samples/bgsound.missing.html').toString());

    // handle the stream
    pluginFunc(payload, function(err){

      // check for a error
      if(err) assert.fail(err);

      // get the rules
      var rules = payload.getRules();

      // check if we got any rules back ...
      if(rules.length > 0)
        assert.fail('Was not expecting a error');

      // done
      done();

    });

  });

  // handle the settings
  it('Should not return a error error if <bgsound /> is missing', function(done){

    // create a dummy payload
    payload = passmarked.createPayload(
      {

        url: 'http://example.com'

      },
      {},
      fs.readFileSync('./samples/bgsound.missing.html').toString());

    // handle the stream
    pluginFunc(payload, function(err){

      // check for a error
      if(err) assert.fail(err);

      // get the rules
      var rules = payload.getRules();

      // check if we got any rules back ...
      if(rules.length > 0)
        assert.fail('Was expecting an error');

      // done
      done();

    });

  });

});