# @passmarked/html

![NPM](https://img.shields.io/npm/dt/@passmarked/html.svg) [![Build Status](https://travis-ci.org/passmarked/html.svg)](https://travis-ci.org/passmarked/html)

[Passmarked](http://passmarked.com) is a suite of tests that can be run against any page/website to identify issues with parity to most online tools in one package.

The [Terminal Client](http://npmjs.org/package/passmarked) is intended for use by developers to integrate into their workflow/CI servers but also integrate into their own application that might need to test websites and provide realtime feedback.

All of the checks on [Passmarked](http://passmarked.com) can be voted on importance and are [open-sourced](http://github.com/passmarked/suite), to encourage community involvement in fixing and adding new rules. We are building the living Web Standard and love any [contributions](#contributing).

## Synopsis

The rules checked in this module are:

* **applet** - The page contains Java Applets in either it's HAR / Page Content / Javascript or detected Stack.
* **flash** - The page contains Flash in either it's HAR / Page Content / Javascript or detected stack.
* **silverlight** - The page contains Silverlight in either it's HAR / Page Content or detected stack.

The w3c service produces a large list of rules as well, these rules are cleaned and generated a key according to output. So it's a bit hard to list all the UID's that can be used, the best move is to check [passmarked.com/library/html](https://passmarked.com/library/html) for the complete list of rules that can be produced and to something specific that you might be looking for.

## Running

The rules are checked everytime a url is run through Passmarked or our API. To run using the hosted system head to [passmarked.com](http://passmarked.com) or our [Terminal Client](http://npmjs.org/package/passmarked) use:

```bash
npm install -g passmarked
passmarked --filter=html example.com
```

The hosted version allows free runs from our homepage and the option to register a site to check in its entirety.
Using the Passmarked npm module (or directly via the API) integrations are also possible to get running reports with all the rules in a matter of seconds.

## Running Locally

All rules can be run locally using our main integration library. This requires installing the package and any dependencies that the code might have such as a specific version of Openhtml, see [#dependencies](#dependencies)

First ensure `passmarked` is installed:

```bash
npm install passmarked
npm install @passmarked/html
```

After which the rules will be runnable using promises:

```javascript
passmarked.createRunner(
  require('@passmarked/html'), // this package
  require('@passmarked/css'), // to test css
  require('@passmarked/network') // to test network performance
).run({
  url: 'http://example.com',
  body: 'body of page here',
  har: {log: {entries: []}}
}).then(function(payload) {
  if (payload.hasRule('secure')) {
    console.log('better check that ...');
  }
  var rules = payload.getRules();
  for (var rule in rules) {
    console.log('*', rules[rule].getMessage());
  }
}).catch(console.error.bind(console));
```

Alternatively, callbacks are also available:

```javascript
passmarked.createRunner(
  require('@passmarked/html'), // this package
  require('@passmarked/css'), // test css
  require('@passmarked/network') // test network performance
).run({
  url: 'http://example.com',
  body: 'body of page here',
  har: {log: {entries: []}}
}, function(err, payload) {
  if (payload.hasRule('secure')) {
    console.log("better check that ...");
  }
  var rules = payload.getRules();
  for (var rule in rules) {
    console.log('*', rules[rule].getMessage());
  }
});
```

## Dependencies

The module requires access to a running version of the VNU validator from W3C. To confingure the module looks for the `` environment variable which will overide the default.

```bash
VNU_VALIDATOR=https://checker.html5.org
```

Other open hosting options include:

* [https://checker.html5.org](checker.html5.org)
* [https://validator.w3.org/nu/](validator.w3.org/nu/)
* [https://html5.validator.nu/](html5.validator.nu/)

By default the module uses [https://checker.html5.org](https://checker.html5.org), which is one of the free hosted versions provided, but be aware of limits as they are open and everyone can use them ... 

If you are like us and expect higher loads, [Passmarked](https://passmarked.com) runs a internallly hosted version of the service that we scale, the docker build for which has been open sourced over at [github.com/passmarked/vnu](https://github.com/passmarked/vnu). Using this file with the following gives you a fully running VNU service on Alpine OS that can be used:

```bash
docker build --tag=passmarked/vnu:latest .
docker run tag=passmarked/vnu:latest
```

Or even easier look into deploying it on services like [App Engine](https://cloud.google.com/appengine/) to remove the management from yourself.

## Rules

Rules represent checks that occur in this module, all of these rules have a **UID** which can be used to check for specific rules. For the structure and more details see the [Wiki](https://github.com/passmarked/passmarked/wiki) page on [Rules](https://github.com/passmarked/passmarked/wiki/Create).

> Rules also include a `type` which could be `critical`, `error`, `warning` or `notice` giving a better view on the importance of the rule.

## Contributing

```bash
git clone git@github.com:passmarked/html.git
npm install
npm test
```

Pull requests have a prerequisite of passing tests. If your contribution is accepted, it will be merged into `develop` (and then `master` after staging tests by the team) which will then be deployed live to [passmarked.com](http://passmarked.com) and on NPM for everyone to download and test.

## About

To learn more visit:

* [Passmarked](http://passmarked.com)
* [Terminal Client](https://www.npmjs.com/package/passmarked)
* [NPM Package](https://www.npmjs.com/package/@passmarked/html)
* [Slack](http://passmarked.com/chat) - We have a Slack team with all our team and open to anyone using the site to chat and figure out problems. To join head over to [passmarked.com/chat](http://passmarked.com/chat) and request a invite.

## License

Copyright 2016 Passmarked Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
