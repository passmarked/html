Element `img` is missing a required attribute `src`. According to the W3C the `img` element always requires to have a `src` attribute. Broken image containers may display if no `src` is present.

```html
<img alt="example" />
```

# How do I fix this ?

Add the `src` attribute to `img` element.

```html
<img src="example.jpg" alt="test" />
```

# Resources

* [W3C - HTML Markup - img](https://www.w3.org/TR/html-markup/img.html#img.attrs.src)
* [StackOverflow - What's the valid way to include an image with no src? ](http://stackoverflow.com/questions/5775469/whats-the-valid-way-to-include-an-image-with-no-src)
* [Quora - Is it OK to omit the src attribute from an IMG tag in HTML?](https://www.quora.com/Is-it-OK-to-omit-the-src-attribute-from-an-IMG-tag-in-HTML)
