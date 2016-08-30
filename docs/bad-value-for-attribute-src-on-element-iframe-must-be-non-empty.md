Empty src attribute was found in an iframe. According to the W3C iframe src attributes may not be empty. The combination of an empty iframe loaded inside a secure web page (SSL/HTTPS) could possibly make browsers display 'This page has insecure content' or similar error and might block the iframe content all together.

```html
<iframe src=""></iframe>
```

# How do I fix this ?

Place `about:blank` inside the `src` attribute:
```html
<iframe src="about:blank"></iframe>
```

# Resources

* [W3C Recommendation 28 October 2014](https://www.w3.org/TR/2014/REC-html5-20141028/embedded-content-0.html#the-iframe-element)
* [StackOverflow - Is an empty iframe src valid?](http://stackoverflow.com/questions/5946607/is-an-empty-iframe-src-valid)
