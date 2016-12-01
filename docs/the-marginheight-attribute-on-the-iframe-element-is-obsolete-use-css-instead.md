The presentation of a web document should be handled, as far as possible, using CSS instead of directly in the markup

```html
<iframe src="external-resource.html" marginheight="20"> <!-- BAD: presentational code in markup -->

</iframe>
```

# How do I fix this ?

Use the css property `padding` on the `iframe` element directly:

```html
<iframe src="external-resource.html"></iframe>
```
```css
iframe {
  padding-top: 0;
  padding-bottom: 0;
}
```

Alternatively, style the content in the iframe directly:
```css
/* Stylesheet imported by iframe document */
body {
  padding: 0;
}
```
# Resources

* [StackOverflow — Remove extra margin from inside an ifame](http://stackoverflow.com/questions/15011230/how-can-i-remove-extra-margin-from-inside-an-iframe)
