// modules
var S         = require('string');
var _         = require('underscore');
var cheerio   = require('cheerio');
var constants = require('./constants');

// actual hashes that check the content
var jarCodePattern = new RegExp(/"(.*?).jar"|'(.*?).jar'/gi);
var classCodePattern = new RegExp(/"(.*?).class"|'(.*?).class'/gi);

// expose the actual function
module.exports = exports = function(payload, fn){

  // get the data
  var data = payload.getData();

  // get the page content to start using it
  payload.getPageContent(function(err, page_content_str) {

    // check for errors, else stop
    if(err) return fn(err);

    // check if content was given
    if(S(page_content_str || '').isEmpty() == true)
      return fn(null);

    // parse out our line strs
    line_strs = page_content_str.split('\n');

    // load in our cheerio context
    $ = cheerio.load(page_content_str);

    // get all the script tags
    $('script,object').each(function(){

      // get the code in the element
      code = ( $(this).html() || '' ).toLowerCase();

      // try to find a match
      match = jarCodePattern.exec(code);

      // get the content
      if(match && match.length > 0) {

        // add the rule
        payload.addRule({

          type: 'error',
          message: constants.MESSAGE,
          key: constants.KEY

        });

      }

      // try to find a match
      match = classCodePattern.exec(code);

      // get the content
      if(match && match.length > 0) {

        // add the rule
        payload.addRule({

          type: 'error',
          message: constants.MESSAGE,
          key: constants.KEY

        });

      }

    });

    // get all the script tags
    $('applet').each(function(){

      // add the rule
      payload.addRule({

        type: 'error',
        message: constants.MESSAGE,
        key: constants.KEY

      });

    });

    // get all the object tags
    $('object').each(function(i, elem) {

      // get the attribute
      var data = ( $(this).attr('data') || '' ).toLowerCase();

      // does it end with the .swf extension ... ?
      if( S(data).endsWith('.jar') == true ) {

        // add the rule
        payload.addRule({

          type: 'error',
          message: constants.MESSAGE,
          key: constants.KEY

        });

      } 

      // does it end with the .swf extension ... ?
      if( S(data).endsWith('.class') == true ) {

        // add the rule
        payload.addRule({

          type: 'error',
          message: constants.MESSAGE,
          key: constants.KEY

        });

      } 

    });

    // add all our rules
    fn(null);

  });

};