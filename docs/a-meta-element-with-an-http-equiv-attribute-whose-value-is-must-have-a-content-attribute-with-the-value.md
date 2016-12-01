By using the so called HTTP-EQUIV tag you are able to add certain values to your website. HTTP-EQUIV meta tags define the header of an HTML document. This is a section of code that is sent to your browser before the rest of the page. It communicates to your browser certain introductory information about the page. You can think of it as a "Hello, I am a HTML page. I was born on such-and-such a date and live on such-and-such a server. I was last modified on such-and-such a day, etc...

**However according to the HTML5 spec this is no longer supported, and rather avoided.**

We could give you the full run down on what values are support but seeing as the element as been deprecated from the HTML5 spec, best just remove it.

# How do I fix this ?

Remove possible locations where a meta tag is trying to specify a header using HTTP-EQUIV.

If the meta tag was used to specify a charset, consider changing the declaration to:

```
<meta charset="utf-8" />
```

which will validate according to the HTML5 spec.

# Resources

* [Meta tags stopping website from HTML5 validating](http://stackoverflow.com/questions/17296065/meta-tags-stopping-website-from-html5-validating)
* [What is the meaning of the meta tag "HTTP=EQUIV"](http://www.metatags.info/meta_http_equiv)
* [Where should I specify my charset if not on a meta element?](http://stackoverflow.com/questions/19593667/where-should-i-specify-my-charset-if-not-on-a-meta-element)
