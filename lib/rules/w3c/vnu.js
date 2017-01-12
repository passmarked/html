// modules
const async       = require('async');
const S           = require('string');
const request     = require('request');
const _           = require('underscore');

/**
* Exposes a interface which we can use to call the HTML validator
**/
VNU = {

  knownElements:      require('../../../known.json'),
  checksumPattern:    /\/\*.*?\/\#/gm,
  identifierPattern:  /\/\*(.*?)\/\#/gm,
  encoding:           'utf-8'

}



/**
* Funcion that is called when we receive work
**/
VNU.exec = function(payload, fn) {

  // get the page content
  payload.getResponse(function(err, response) {

    // check for errors, else stop
    if(err) {

      // debug
      payload.error('vnuDebug', 'Skipping HTML as we got a error while trying to fetch page content', err);

      // stop exec
      return fn(err);

    }

    // did we get a response ... ?
    if(!response) {

      // debug
      payload.warning('vnuDebug', 'Skipping HTML as there was not response object from the HAR for the page')

      // nope
      return fn(null);

    }

    // get the content
    var content = null;

    // set it
    if(response.body) {

      // set to the body
      content = response.body;

    } else if(response.content && 
                response.content.text) {

      // set the content
      content = response.content.text;

    }

    // check if content was given
    if(S(content || '').isEmpty() == true) {

      // debug
      payload.warning('vnuDebug', 'Skipping HTML as we got blank content back ... ?');

      // stop exec
      return fn(null);

    }

    // get the results
    VNU.run(payload, content, function(err, results){

      // check if we got results
      if(err)
        return fn(err);

      // check if we got any results
      if((results || []).length == 0)
        return fn(null);

      // parse out our line strs
      var lines = content.split('\n');

      // add all our rules
      VNU.parse(payload, lines, results, fn);

    });

  });

};

/**
* Returns the VNU validation payload from our hosted service
**/
VNU.run = function(payload, content, fn) {

  // get the data from the payload
  var data          = payload.getData();

  // where the vnu service is running set the host
  var VNU_HOST_URL  = process.env.VNU_VALIDATOR || 'https://vnu.passmarked.com';

  // get the output
  request.post({

    method:     'POST',
    type:       'POST',
    url:        VNU_HOST_URL + '/?laxtype=yes&out=json&asciiquotes=yes',
    timeout:    1000 * 20,
    headers:    {

      'Content-Type':     'text/html; charset=' + VNU.encoding,
      'Content-Length':   Buffer.byteLength(content, VNU.encoding),
      'User-Agent':       'Passmarked/1.0 (compatible; Mozilla/5.0; +http://passmarked.com/docs/agent)'

    },
    body: content

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
  message = message.replace(VNU.checksumPattern, '$');
  message = message.replace('(Suppressing further errors from this subtree.)', '');
  message = message.replace(', except under certain conditions. ', '. ');
  message = message.split('. ')[0];
  message = S(message).trim().chompRight('.', '').s;

  // retunr the cleaned string
  fn(null, message);

};

/**
* Function that is called on each returned rule from
**/
VNU.parseRule = function(payload, line_strs, rule, fn) {

  // get the data
  var data = payload.getData();

  // clean the message from known elements
  VNU.cleanKnown(rule.message || '', function(err, message){

    // return the error if any
    if(err)
      return fn(err);

    // ignore info rules
    if([ 'notice', 'info' ].indexOf(rule.type) !== -1)
      return fn(null);

    // the cleaned list of identifiers
    var identifiers = [];

    // create the regex object to use
    var re = new RegExp(VNU.identifierPattern);

    // loop and replace all the idenfiers
    while(match = re.exec(rule.message)) {

      // clean it up
      var cleaned_identifier = '' + match[0];
      cleaned_identifier = cleaned_identifier.replace('/*', '');
      cleaned_identifier = cleaned_identifier.replace('/#', '');
      cleaned_identifier = S(cleaned_identifier).trim().s

      // add the identifier
      identifiers.push(cleaned_identifier);

    }

    // the subject to highlight
    var subjectLineNumber = rule.lastLine;

    // create the occurence
    var occurence = {

      identifiers:  identifiers,
      display:      'text',
      message:      message.indexOf('$') != -1 ? message : _.unescape(rule.extract),
      filename:     data.url

    };

    // is this page minified ?
    if(line_strs.length < 5) {

      occurence.display = 'code';
      occurence.code    = {

        start:      0,
        end:        1,
        subject:    0,
        text:       [

          '... ' + _.unescape(rule.extract) + ' ...'

        ]

      };

    } else {

      // build the codeblock
      var start     = payload.getSnippetManager().getStart(line_strs.length, subjectLineNumber-1, 3);
      var end       = payload.getSnippetManager().getEnd(line_strs.length, subjectLineNumber-1, 3);
      var txts      = payload.getSnippetManager().slice(line_strs, start, end);

      // did we find any code ?
      if(txts.length > 0) {

        occurence.display = 'code';
        occurence.code    = {

          start:      start,
          end:        end,
          subject:    subjectLineNumber-1 < 0 ? subjectLineNumber : subjectLineNumber-1,
          text:       txts

        };

      }

    }

    // handle the type
    var level = 'notice';

    // downgrade errors to warnings instead
    if(rule.type == 'error') level = 'warning';

    // add to our payload
    payload.addRule({

      type:     level,
      message:  message,
      key:      S(message).slugify().s

    }, occurence);

    // done
    fn(null);

  });

};

// expose the interface
module.exports = exports = VNU;
