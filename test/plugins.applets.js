// modules
var assert      = require('assert')
var _           = require('underscore')
var fs          = require('fs');
var passmarked  = require('passmarked');
var pluginFunc  = require('../lib/rules/plugins/applets');

describe('plugins', function(){

  describe('applets', function(){

    describe('body detection', function(){

      // handle the settings
      it('Should not return a error if Java is not present in a object element', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          },
          {},
          fs.readFileSync('./samples/plugins.applets.body.none.html').toString());

        // handle the stream
        pluginFunc(payload, function(err){

          // check for a error
          if(err) assert.fail(err);

          // get the rules
          var rules = payload.getRules();

          // check if we got any rules back ...
          if(rules.length > 0)
            assert.fail('Should not return a rule if Java is not present');

          // done
          done();

        });

      });

      // handle the settings
      it('Should return a error if Java file was found in object', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          
          },
          null,
          fs.readFileSync('./samples/plugins.applets.body.object.html').toString());

        // handle the stream
        pluginFunc(payload, function(err){

          // check for a error
          if(err) assert.fail(err);

          // get the rules
          var rules = payload.getRules();

          // check if we got any rules back ...
          if(rules.length == 0)
            assert.fail('Should return a rule when Java is present');

          // done
          done();

        });

      });

      // handle the settings
      it('Should return a error if Java was found on the body of assets or inline scripts (.class)', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          
          },
          null,
          fs.readFileSync('./samples/plugins.applets.body.scripts.class.html').toString());

        // handle the stream
        pluginFunc(payload, function(err){

          // check for a error
          if(err) assert.fail(err);

          // get the rules
          var rules = payload.getRules();

          // check if we got any rules back ...
          if(rules.length == 0)
            assert.fail('Should return a rule when Java is present');

          // done
          done();

        });

      });

      // handle the settings
      it('Should return a error if Java was found on the body of assets or inline scripts (.jar)', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          },
          null,
          fs.readFileSync('./samples/plugins.applets.body.scripts.html').toString());

        // handle the stream
        pluginFunc(payload, function(err){

          // check for a error
          if(err) assert.fail(err);

          // get the rules
          var rules = payload.getRules();

          // check if we got any rules back ...
          if(rules.length == 0)
            assert.fail('Should return a rule when Java is present');

          // done
          done();

        });

      });

      // handle the settings
      it('Should not return a error if Java is not present in the body of inline or assets', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          },
          {},
          fs.readFileSync('./samples/plugins.applets.body.none.html').toString());

        // handle the stream
        pluginFunc(payload, function(err){

          // check for a error
          if(err) assert.fail(err);

          // get the rules
          var rules = payload.getRules();

          // check if we got any rules back ...
          if(rules.length > 0)
            assert.fail('Should not return a rule if Java is not present');

          // done
          done();

        });

      });

    });

    describe('stack detection', function(){

      // handle the settings
      it('Should return a error if Java was found on in the stack list', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com',
            stack: [

              { key: 'java' },
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
            assert.fail('Should return a rule when Java is present');

          // done
          done();

        });

      });

      // handle the settings
      it('Should not return a error if Java is not present in the stack', function(done){

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
            assert.fail('Should not return a rule if Java is not present');

          // done
          done();

        });

      });

    });

    describe('HAR detection', function(){

      // handle the settings
      it('Should not return a error if Java is not present', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          },
          require('../samples/plugins.applets.none.json'),
          fs.readFileSync('./samples/plugins.applets.body.none.html').toString());

        // handle the stream
        pluginFunc(payload, function(err){

          // check for a error
          if(err) assert.fail(err);

          // get the rules
          var rules = payload.getRules();

          // check if we got any rules back ...
          if(rules.length > 0)
            assert.fail('Should not return a rule if Java is not present');

          // done
          done();

        });

      });

      // handle the settings
      it('Should return a error if Java was found on the page', function(done){

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          },
          require('../samples/plugins.applets.contains.json'),
          fs.readFileSync('./samples/plugins.applets.body.none.html').toString());

        // handle the stream
        pluginFunc(payload, function(err){

          // check for a error
          if(err) assert.fail(err);

          // get the rules
          var rules = payload.getRules();

          // check if we got any rules back ...
          if(rules.length == 0)
            assert.fail('Should return a rule when Java is present');

          // done
          done();

        });

      });

    });

  });

});
