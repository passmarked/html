Bad value was found for iframe attribute `height`. According to the W3C the iframe `height` attribute can only contain non negative integers. This could cause the iframe not to display.

```html
<iframe width="100" height="100px"></iframe>
```

# How do I fix this ?

Drop anything non integer in the `height` attribute.

```html
<iframe width="100" height="100"></iframe>
```

# Resources

* [W3C Wiki - HTML/Elements/iframe](https://www.w3.org/wiki/HTML/Elements/iframe)
* [W3C - HTML Markup - iframe](https://www.w3.org/TR/2012/WD-html-markup-20121011/iframe.html#iframe.attrs.height)
