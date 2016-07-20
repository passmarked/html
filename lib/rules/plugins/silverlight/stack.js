// modules
var S         = require('string');
var _         = require('underscore');
var cheerio   = require('cheerio');
var constants = require('./constants');

// expose the actual function
module.exports = exports = function(payload, fn){

  // get the data
  var data = payload.getData();

  // first we try a few checks in the stack
  for(var i = 0; i < (data.stack || []).length; i++) {

    // get the stack object for easy referencing
    var stackItem = data.stack[i];

    // check if this includes 'swfobject'
    if(stackItem.key === 'silverlight') {

      // add the rule
      payload.addRule({

        type: 'error',
        message: constants.MESSAGE,
        key: constants.KEY

      });

      // stop processing
      break;

    }

  }

  // done
  fn(null);

};