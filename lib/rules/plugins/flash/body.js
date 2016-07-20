// modules
var S         = require('string');
var _         = require('underscore');
var cheerio   = require('cheerio');
var constants = require('./constants');

// actual hashes that check the content
var swfCodePattern = new RegExp(/"(.*?).swf"|'(.*?).swf'/gi);

// expose the actual function
module.exports = exports = function(payload, fn){

  // get the data
  var data = payload.getData();

  // message to return
  var message = 'Flash was found on the page which would be unusable by newer browers';

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
    $('script').each(function(){

      // get the code in the element
      code = ( $(this).html() || '' ).toLowerCase();

      // try to find a match
      match = swfCodePattern.exec(code);

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

    // get all the object tags
    $('object').each(function(i, elem) {

      // get the attribute
      var data = ( $(this).attr('data') || '' ).toLowerCase();

      // does it end with the .swf extension ... ?
      if( S(data).endsWith('.swf') !== -1 ) {

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