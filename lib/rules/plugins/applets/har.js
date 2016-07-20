// modules
var S         = require('string');
var _         = require('underscore');
var cheerio   = require('cheerio');
var constants = require('./constants');

// list of known flash content types
var knownContentTypes = [
  
  'application/java-archive',
  'java-archive',
  'application/java-vm',
  'java-vm',
  ' text/vnd.sun.j2me.app-descriptor',
  'application/x-java-jnlp-file',
  'application/java-serialized-object'

];

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

    // get the page content to start using it
    payload.getHAR(function(err, HAR) {

      // check for errors, else stop
      if(err) return fn(err);

      // check if content was given
      if(!HAR) return fn(null);

      // sanity checks
      if(!HAR.log) return fn(null);
      if(!HAR.log.entries) return fn(null);

      // parse out our line strs
      line_strs = page_content_str.split('\n');

      // return the rule
      for(var i = 0; i < HAR.log.entries.length; i++) {

        // sanity check
        if(!HAR.log.entries[i].response) continue;

        // loop all the headers and find the 
        var contentTypeHeader = _.find(HAR.log.entries[i].response.headers || [], function(header){

          return header.name.toLowerCase() == 'content-type';

        });

        // did we find the header ?
        if(!contentTypeHeader) continue;

        // clean up the value
        var headerValue = contentTypeHeader.value.toLowerCase();

        // loop all the known types
        for(var a = 0; a < knownContentTypes.length; a++) {

          // yes we did use it
          if(headerValue.indexOf(knownContentTypes[a]) !== -1) {

            // found one ...
            payload.addRule({

              type: 'error',
              message: constants.MESSAGE,
              key: constants.KEY

            });

            // stop processing known types now
            break;

          }

        }

      }

      // add all our rules
      fn(null);

    });

  });

};