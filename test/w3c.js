// modules
var assert      = require('assert');
var _           = require('underscore');
var fs          = require('fs');
var VNU         = require('../lib/rules/w3c/vnu');
var passmarked  = require('passmarked');

describe('w3c', function(){

  // handle the settings
  describe('VNU', function(){

    describe('#exec', function(){

      // handle the error output
      it('io.co.za should return broken rules from payload', function(done) {

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          },
          {

            log: {

              entries: [

                {

                  request:  {},
                  response: {

                    status: 200,
                    headers: [

                      {

                        name: 'content-type',
                        value:  'text/html'

                      }

                    ],
                    content: {

                      text: fs.readFileSync('./samples/io.co.za.html').toString()

                    }

                  }

                }

              ]

            }

          },
          fs.readFileSync('./samples/io.co.za.html').toString());

        // use the payload and some results
        VNU.exec(payload, function(err){

          // check for a error
          if(err)
            assert.fail(err);

          // check if we got the right amount back
          if(payload.getRules().length == 0)
            assert.fail('Got no rules broken from io.co.za');

          // check if we got the right amount back
          if(payload.getRules().length === 0)
            assert.fail('Expected broken rules, but got ' +  payload.getRules().length + ' on io.co.za');

          // finish up
          done();

        });

      });

      // handle the error output
      it('loadshed.org should return broken rules from payload', function(done) {

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          },
          {

            log: {

              entries: [

                {

                  request:  {},
                  response: {

                    status: 200,
                    headers: [

                      {

                        name: 'content-type',
                        value:  'text/html'

                      }

                    ],
                    content: {

                      text: fs.readFileSync('./samples/loadshed.org.html').toString()

                    }

                  }
                  
                }

              ]

            }

          },
          fs.readFileSync('./samples/loadshed.org.html').toString());

        // use the payload and some results
        VNU.exec(payload, function(err){

          // check for a error
          if(err)
            assert.fail(err);

          // check if we got the right amount back
          if(payload.getRules().length == 0)
            assert.fail('Got no rules broken from loadshed.org');

          // check if we got the right amount back
          if(payload.getRules().length === 0)
            assert.fail('Expected broken rules, but got ' +  payload.getRules().length + ' on loadshed.org');

          // finish up
          done();

        });

      });

    });

    describe('#run', function(){

      // handle the error output
      it('io.co.za should return rules', function(done) {

        // get the contnet
        var content = fs.readFileSync('./samples/io.co.za.html').toString();

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          },
          {

            log: {

              entries: [

                {

                  request:  {},
                  response: {

                    status: 200,
                    headers: [

                      {

                        name: 'content-type',
                        value:  'text/html'

                      }

                    ],
                    content: {

                      text: content

                    }

                  }
                  
                }

              ]

            }

          },
          content);

        // use the payload and some results
        VNU.run(payload, content, function(err, results){

          // check for a error
          if(err)
            assert.fail(err);

          // check if results defined
          if(!results)
            assert.fail('No results returned');

          // check if we got the right amount back
          if(results.length === 0)
            assert.fail('Expected broken rules but got ' + results.length)

          // finish up
          done();

        });

      });

      // handle the error output
      it('loadshed.org should return messages', function(done) {

        // get the contnet
        var content = fs.readFileSync('./samples/loadshed.org.html').toString();

        // create a dummy payload
        payload = passmarked.createPayload(
          {

            url: 'http://example.com'

          },
          {

            log: {

              entries: [

                {

                  request:  {},
                  response: {

                    status: 200,
                    headers: [

                      {

                        name: 'content-type',
                        value:  'text/html'

                      }

                    ],
                    content: {

                      text: content

                    }

                  }
                  
                }

              ]

            }

          },
          content);

        // use the payload and some results
        VNU.run(payload, content, function(err, results){

          // check for a error
          if(err)
            assert.fail(err);

          // check if results defined
          if(!results)
            assert.fail('No results returned');

          // check if we got the right amount back
          if(results.length === 0)
            assert.fail('Expected broken rules but got ' + results.length)

          // finish up
          done();

        });

      });

    });

    describe('#parse', function(){

      // handle the error output
      it('Should return a array equal to the rules passed in', function(done) {

        // create a dummy payload
        payload = passmarked.createPayload({

            url: 'http://example.com'

        }, {}, null);

        // fake rules to pass in
        var rules = [

          {

            key: 'test',
            message: 'Some Rule'

          },
          {

            key: 'test2',
            message: 'Some Rule #2'

          },
          {

            key: 'test3',
            message: 'Some Rule #3'

          }

        ];

        // run the demo
        VNU.parse(payload, ['a', 'b', 'c'], rules, function(err) {

          // check for error
          if(err)
            assert.fail(err);

          // check if we have the same amount of
          if(payload.getRules().length !== rules.length)
            assert.fail('Only ' + payload.getRules().length + ' rules were received back while we were expecting ' + rules.length);

          // done
          done();

        });

      });

    });

    describe('#parseRule', function(){

      // handle the error output
      it('should upgrade errors to warnings', function(done) {

        // create a dummy payload
        payload = passmarked.createPayload({

            url: 'http://example.com'

        }, {}, null);

        // run the demo
        VNU.parseRule(payload, ['a', 'b', 'c'], {

          type: 'error',
          message: 'here'

        }, function(err) {

          // check for error
          if(err)
            assert.fail(err);

          // check if we have the same amount of
          if(payload.getRules().length == 0)
            assert.fail('Only ' + payload.getRules().length + ' rules were received back while we were expecting 1');

          // check that this is a warning now ...
          if(payload.getRules()[0].type !== 'warning')
            assert.fail('Did not upgrade a error to an warning');

          // done
          done();

        });

      });

      // handle the error output
      it('should add a rule to the rules list', function(done) {

        // create a dummy payload
        payload = passmarked.createPayload({

            url: 'http://example.com'

        }, {}, null);

        // run the demo
        VNU.parseRule(payload, ['a', 'b', 'c'], {

          type: 'warning',
          message: 'here'

        }, function(err) {

          // check for error
          if(err)
            assert.fail(err);

          // check if we have the same amount of
          if(payload.getRules().length !== 1)
            assert.fail('Only ' + payload.getRules().length + ' rules were received back while we were expecting 1');

          // done
          done();

        });

      });

      // handle the error output
      it('should not return any info rules', function(done) {

        // create a dummy payload
        payload = passmarked.createPayload({

            url: 'http://example.com'

        }, {}, null);

        // run the demo
        VNU.parseRule(payload, ['a', 'b', 'c'], {

          type: 'info',
          message: 'here'

        }, function(err) {

          // check for error
          if(err)
            assert.fail(err);

          // check if we have the same amount of
          if(payload.getRules().length !== 0)
            assert.fail('Only ' + payload.getRules().length + ' rules were received back while we were expecting 0');

          // done
          done();

        });

      });

    });

    describe('#cleanKnown', function(){

      // handle the error output
      it('Should remove "article" from the message', function(done) {

        // read in the html sample
        VNU.cleanKnown('"article" was not found', function(err, message){

          // fail if error
          if(err) assert.fail(err);

          // fail if not found
          if(!message) asset.fail('Message was blank');

          //  check if the known was removed from qoutes
          if(message.toLowerCase().indexOf('"article"') !== -1)
            assert.fail('"article" was still present in doc');

          // done
          done();

        });

      });

      // handle the error output
      it('Should trim the string', function(done) {

        // read in the html sample
        VNU.cleanKnown(' here here ', function(err, message){

          // fail if error
          if(err) assert.fail(err);

          // fail if not found
          if(!message) asset.fail('Message was blank');

          //  check if the known was removed from qoutes
          if(message.toLowerCase() !== 'here here')
            assert.fail('Trim did not work');

          // done
          done();

        });

      });

      // handle the error output
      it('Should remove trailing dots', function(done) {

        // read in the html sample
        VNU.cleanKnown('testing the end of the sentence.', function(err, message){

          // fail if error
          if(err) assert.fail(err);

          // fail if not found
          if(!message) asset.fail('Message was blank');

          //  check if the known was removed from qoutes
          if(message.toLowerCase() !== 'testing the end of the sentence')
            assert.fail('The last dot was not removed sentance');

          // done
          done();

        });

      });

    });

  });

});
