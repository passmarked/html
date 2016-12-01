Line break elements are not allowed as direct children of any type of list element, namely: `<ol>` (ordered lists), `<ul>` (unordered lists) or `<dl>` (description lists).

```html
<!-- BAD: line breaks as children of unordered lists -->
<ul>
  <li>Item One</li><br>
  <li>Item Two</li><br>
  <li>Item Three</li>
</ul>
```

# How do I fix this ?

Use css `margin-bottom` instead of line breaks to create space between items:

```html
<!-- GOOD: Valid HTML -->
<ul>
  <li>Item One</li>
  <li>Item Two</li>
  <li>Item Three</li>
</ul>
```
```css
li {
  margin-bottom: 1em;
}
```

# Resources

* [StackOverflow - Line breaks in description lists](http://stackoverflow.com/questions/23687838/how-to-add-a-line-break-br-in-dl-in-html)
