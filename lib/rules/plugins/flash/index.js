// required modules
var async = require('async');

// expose the function
module.exports = exports = function(payload, fn) {

  // handle executing and passing the correct
  // object so each test
  var handleTestExec = function(testFunc, cb) {

    // execute the function with the payload
    // and return the current call function
    testFunc(payload, cb);

  };

  // run each of the tests
  async.each([
    
    require('./body'),
    require('./har'),
    require('./stack')

  ], handleTestExec, fn);

};