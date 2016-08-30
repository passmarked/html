The presentation of a web document should be handled, as far as possible, using CSS instead of directly in the markup

```html
<iframe src="external-resource.html" scrolling="no"> <!-- BAD: presentational code in markup -->

</iframe>
```

# How do I fix this ?

Use the css property `overflow` on the `iframe` element directly:

```html
<iframe class="noscroll" src="external-resource.html"></iframe>
```
```css
.noscroll {
  overflow: hidden;
}
```

# Resources

* [StackOverflow — HTML5 iframe no scrolling](http://stackoverflow.com/questions/18470015/html5-iframe-no-scrolling)
