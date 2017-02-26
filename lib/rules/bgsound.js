// modules
var S         = require('string');
var _         = require('underscore');
var cheerio   = require('cheerio');

// actual hashes that check the content
var swfCodePattern = new RegExp(/"(.*?).swf"|'(.*?).swf'/gi);

// expose the actual function
module.exports = exports = function(payload, fn){

  // get the data
  var data = payload.getData();

  // get the page content to start using it
  payload.getPageContent(function(err, content) {

    // check for errors, else stop
    if(err) return fn(err);

    // check if content was given
    if(S(content || '').isEmpty() == true) {

      // done
      return fn(null);

    }

    // load in our cheerio context
    $ = cheerio.load(content);

    // get all the object tags
    $('bgsound').each(function(i, elem) {

      // add the rule
      payload.addRule({

        type:         'error',
        message:      'Do not use the <bgsound> element',
        key:          'bgsound'

      }, {

        message:      '$ is very much looked down on',
        type:         'text',
        identifiers:  [ 'bgsound' ]

      });

    });

    // add all our rules
    fn(null);

  });

};