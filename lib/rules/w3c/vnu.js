// modules
var async     = require('async');
var S         = require('string');
var request   = require('request');

/**
* Exposes a interface which we can use to call the HTML validator
**/
VNU = {

  knownElements: require('../../../known.json'),
  checksumPattern: /\/\*.*?\/\#/gm,
  identifierPattern: /\/\*(.*?)\/\#/gm

}

/**
* Funcion that is called when we receive work
**/
VNU.exec = function(payload, fn) {

  // get the results
  VNU.run(payload, function(err, results){

    // check if we got results
    if(err)
      return fn(err);
    if((results || []).length == 0)
      return fn(null);

    // get the page content
    payload.getPageContent(function(err, page_content_str) {

      // check for errors, else stop
      if(err)
        return fn(err);

      // check if content was given
      if(S(page_content_str || '').isEmpty() == true)
        return fn(null);

      // parse out our line strs
      var lines = page_content_str.split('\n');

      // add all our rules
      VNU.parse(payload, lines, results, fn);

    });

  });

};

/**
* Returns the VNU validation payload from our hosted service
**/
VNU.run = function(payload, fn) {

  // get the data from the payload
  data            = payload.getData();

  // get the page content
  payload.getPageContent(function(err, page_content_str) {

    // check for errors, else stop
    if(err)
      return fn(err);

    // check if content was given
    if(S(page_content_str || '').isEmpty() == true)
      return fn(null);

    // where the vnu service is running set the host
    var vnu_hostname_str = process.env.VNU_VALIDATOR || 'https://checker.html5.org';

    // get the output
    request.post({

      method: 'POST',
      type: 'POST',
      url: vnu_hostname_str + '/?laxtype=yes&out=json&asciiquotes=yes',
      timeout: 1000 * 20,
      headers: {

        'Content-Type': 'text/html; charset=utf8'

      },
      body: page_content_str

    }, function(err, response, body) {

      // check for err
      if(err)
        return fn(err);

      // check the status
      if(response && response.statusCode != 200)
        return fn(new Error('Could not parse output from HTML validation'));

      // depending on type returned from this service.
      // This could either be the JSON object || a string
      // by default we assume a object, after this we try to
      // do a quick parse which will catch the string if the VNU
      // library returns the content-type wrong as it seems to do
      // on occasions
      var vnuOutputObj = body;
      var parseError = null;

      // try to parse
      try {

        // set the final output
        vnuOutputObj = JSON.parse(
          body.replace(
            /“/gm, '/*'
          ).replace(
            ' ??', ' /*'
          ).replace(
            '?? ', '/# '
          ).replace(
            ' ???', ' /*'
          ).replace(
            '??? ', '/# '
          ).replace(
            /\s\?\?\?/gm, ' /*'
          ).replace(
            /\?\?\?\s/gm, '/# '
          ).replace(
            /\?\?\?\./gm, '/# '
          ).replace(
            /\?\?\?/gm, '/#'
          ).replace(
            /”/gm, '/#'
          ).replace(
            'Waiting for document content on standard input...', ''
          )
        );

      } catch(err) {

        // set the error
        parseError = err;

      }

      // check if we could parse
      if(parseError)
        return fn(parseError)

      if(!vnuOutputObj)
        return fn(new Error('Could not parse output from HTML validation'));

      // return the result
      fn(parseError, (vnuOutputObj || {}).messages || []);

    });

  });

};

/**
* Called to loop and add rules from the response
**/
VNU.parse = function(payload, line_strs, errors, fn) {

  // run through all of the errors
  async.each(errors || [], function(rule, cb){

    // parse the rule given
    VNU.parseRule(payload,line_strs,rule,cb);

  }, fn);

};

/**
* Removes voids tags from "expressions"
**/
VNU.cleanKnown = function(message, fn) {

  // lowered message for checks
  var loweredMessage = message.toLowerCase();

  // loop all the known elements
  for(var i = 0; i < VNU.knownElements.length; i++) {

    if(loweredMessage.toLowerCase().indexOf(VNU.knownElements[i]) !== -1) {

      // remove the label
      message = message.replace('/*' + VNU.knownElements[i] + '/#', VNU.knownElements[i]);
      message = message.replace('"' + VNU.knownElements[i] + '"', VNU.knownElements[i]);

    }

  }

  // remove common messages
  message = message.replace(VNU.checksumPattern, '$$');
  message = message.replace('(Suppressing further errors from this subtree.)', '');
  message = S(message).trim().chompRight('.', '').s;

  // retunr the cleaned string
  fn(null, message);

};

/**
* Function that is called on each returned rule from
**/
VNU.parseRule = function(payload, line_strs, rule, fn) {

  // get the data
  data          = payload.getData()

  // clean the message from known elements
  VNU.cleanKnown(rule.message || '', function(err, message){

    // return the error if any
    if(err)
      return fn(err);

    // ignore info rules
    if([ 'notice', 'info' ].indexOf(rule.type) !== -1)
      return fn(null);

    // the cleaned list of identifiers
    identifiers = [];

    // create the regex object to use
    re = new RegExp(VNU.identifierPattern);

    // loop and replace all the idenfiers
    while(match = re.exec(rule.message)) {

      // clean it up
      cleaned_identifier = '' + match[0];
      cleaned_identifier = cleaned_identifier.replace('/*', '');
      cleaned_identifier = cleaned_identifier.replace('/#', '');
      cleaned_identifier = S(cleaned_identifier).trim().s

      // add the identifier
      identifiers.push(cleaned_identifier);

    }

    // build the codeblock
    target = rule.firstLine;
    start = payload.getSnippetManager().getStart(line_strs.length, target, 3);
    end = payload.getSnippetManager().getEnd(line_strs.length, target, 3);
    txts = payload.getSnippetManager().slice( line_strs, start, end );

    // loop and find our context
    for(var i = 0; i < txts.length; i++) {

      // get the local txt
      var localtxt = txts[i].toLowerCase();

      // loop identifiers
      for(var a = 0; a < identifiers.length; a++) {

        // get the correct item out
        if(localtxt.indexOf(identifiers[a].toLowerCase()) != -1) {

          // set to current
          target = start + i;

          // done
          break;

        }

      }

    }

    // create the occurence
    var occurence = {

      identifiers: identifiers,
      display: 'text',
      header: data.url

    };

    // add the code if we found it ?
    if(start && start > -1) {

      // update to use the code
      occurence.display = 'code';
      occurence.code = {

        start: start,
        end: end,
        subject: target,
        text: txts

      };

    }

    // handle the type
    type_str = 'notice';

    // downgrade errors to warnings instead
    if(rule.type == 'error') type_str = 'warning';

    // add to our payload
    payload.addRule({

      type: type_str,
      display: occurence.display,
      message: message,
      key: S(message).slugify().s

    }, occurence);

    // done
    fn(null);

  });

};

// expose the interface
module.exports = exports = VNU;
