Bad value was found in an height attribute for image. According to the W3C image tag height attributes can only contain non negative integers. This could cause the image not to display.

```html
<img src="/sample.png" height="100px" />

<img src="/sample.png" height="100%" />
```

# How do I fix this ?

Drop anything non integer in the `height` attribute.

```html
<img src="/sample.png" height="100" />
```

# Resources

* [W3C - img](http://w3c.github.io/html-reference/img.html)
* [W3C - Data types](http://w3c.github.io/html-reference/datatypes.html#common.data.integer.non-negative)
* [StackOverflow - HTML5 validation of image tags](http://stackoverflow.com/questions/7393392/html5-validation-of-image-tags)
