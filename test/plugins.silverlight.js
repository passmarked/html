// modules
var assert      = require('assert')
var _           = require('underscore')
var fs          = require('fs');
var passmarked  = require('passmarked');
var pluginFunc  = require('../lib/rules/plugins/silverlight');

describe('plugins', function(){

  describe('silverlight', function(){

    describe('body detection', function(){

      // handle the settings
      it('Should not return a error if Silverlight is not present in a object element', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          },
          {},
          fs.readFileSync('./samples/plugins.silverlight.body.none.html').toString());

        // handle the stream
        pluginFunc(payload, function(err){

          // check for a error
          if(err) assert.fail(err);

          // get the rules
          var rules = payload.getRules();

          // check if we got any rules back ...
          if(rules.length > 0)
            assert.fail('Should not return a rule if Silverlight is not present');

          // done
          done();

        });

      });

      // handle the settings
      it('Should return a error if Silverlight file was found in object', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          },
          null,
          fs.readFileSync('./samples/plugins.silverlight.body.contains.html').toString());

        // handle the stream
        pluginFunc(payload, function(err){

          // check for a error
          if(err) assert.fail(err);

          // get the rules
          var rules = payload.getRules();

          // check if we got any rules back ...
          if(rules.length == 0)
            assert.fail('Should return a rule when Silverlight is present');

          // done
          done();

        });

      });

      // handle the settings
      it('Should return a error if Silverlight was found on the body of assets or inline scripts', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          },
          null,
          fs.readFileSync('./samples/plugins.silverlight.body.scripts.html').toString());

        // handle the stream
        pluginFunc(payload, function(err){

          // check for a error
          if(err) assert.fail(err);

          // get the rules
          var rules = payload.getRules();

          // check if we got any rules back ...
          if(rules.length == 0)
            assert.fail('Should return a rule when Silverlight is present');

          // done
          done();

        });

      });

      // handle the settings
      it('Should not return a error if Silverlight is not present in the body of inline or assets', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          },
          {},
          fs.readFileSync('./samples/plugins.silverlight.body.none.html').toString());

        // handle the stream
        pluginFunc(payload, function(err){

          // check for a error
          if(err) assert.fail(err);

          // get the rules
          var rules = payload.getRules();

          // check if we got any rules back ...
          if(rules.length > 0)
            assert.fail('Should not return a rule if Silverlight is not present');

          // done
          done();

        });

      });

    });

    describe('stack detection', function(){

      // handle the settings
      it('Should return a error if Silverlight was found on in the stack list', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {


            url: 'http://example.com',
            stack: [

              { key: 'silverlight' },
              { key: 'google-analytics' }

            ]

          },
          {},
          '');

        // handle the stream
        pluginFunc(payload, function(err){

          // check for a error
          if(err) assert.fail(err);

          // get the rules
          var rules = payload.getRules();

          // check if we got any rules back ...
          if(rules.length == 0)
            assert.fail('Should return a rule when Silverlight is present');

          // done
          done();

        });

      });

      // handle the settings
      it('Should not return a error if Silverlight is not present in the stack', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {


            url: 'http://example.com',
            stack: [

              { key: 'jquery' }

            ]

          },
          {},
          '');

        // handle the stream
        pluginFunc(payload, function(err){

          // check for a error
          if(err) assert.fail(err);

          // get the rules
          var rules = payload.getRules();

          // check if we got any rules back ...
          if(rules.length > 0)
            assert.fail('Should not return a rule if Silverlight is not present');

          // done
          done();

        });

      });

    });

    describe('HAR detection', function(){

      // handle the settings
      it('Should not return a error if Silverlight is not present', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          },
          require('../samples/plugins.silverlight.none.json'),
          fs.readFileSync('./samples/plugins.silverlight.body.none.html').toString());

        // handle the stream
        pluginFunc(payload, function(err){

          // check for a error
          if(err) assert.fail(err);

          // get the rules
          var rules = payload.getRules();

          // check if we got any rules back ...
          if(rules.length > 0)
            assert.fail('Should not return a rule if Silverlight is not present');

          // done
          done();

        });

      });

      // handle the settings
      it('Should return a error if Silverlight was found on the page', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          },
          require('../samples/plugins.silverlight.contains.json'),
          fs.readFileSync('./samples/plugins.silverlight.body.none.html').toString());

        // handle the stream
        pluginFunc(payload, function(err){

          // check for a error
          if(err) assert.fail(err);

          // get the rules
          var rules = payload.getRules();

          // check if we got any rules back ...
          if(rules.length == 0)
            assert.fail('Should return a rule when Silverlight is present');

          // done
          done();

        });

      });

    });

  });

});
