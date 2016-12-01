Declaring character encoding at the server level is preferred. When the web document is _served_ by the server the server sends a HTTP header. The browser takes the information sent and prepares to render the page.

If you are not able to declare the character encoding at the server level the character encoding of the web document can be declared using a meta tag. This must be right after the <head> tag to avoid the browser reparsing the document.

It is preferable to use both methods, as the document can then be rendered properly when viewed from the file system. **Make sure the declarations match!**

```html
<head>
  <meta charset='utf-8'>
```

# How do I fix this ?

Make sure the charset declared in `meta charset` matches the server-sent headers. 

# Resources

* [Declaring character encoding](http://www.htmlbasictutor.ca/declaring-character-encoding.htm)
* [Character encoding errors](http://stackoverflow.com/questions/31490544/error-the-character-encoding-was-not-declared)
