The presentation of a web document should be handled, as far as possible, using CSS instead of directly in the markup

```html
<iframe src="external-resource.html" frameborder="0"> <!-- BAD: presentational code in markup -->

</iframe>
```

# How do I fix this ?

Use the css property `border` on the `iframe` element directly:

```html
<iframe src="external-resource.html"></iframe>
```
```css
iframe {
  border: 0;
}
```

# Resources

* [StackOverflow — HTML5 and frameborder](http://stackoverflow.com/questions/3601273/html5-and-frameborder)
