The presentation of a web document should be handled, as far as possible, using CSS instead of directly in the markup

```html
<table cellspacing="0"> <!-- BAD, presentation in markup -->
  <tr>
    <td>Cell Content</td>
  </tr>
</table>
```

# How do I fix this ?

Use the css property `padding` on the table cell (`td`) element directly:


```html
<table>
  <tr>
    <td>Cell Content</td>
  </tr>
</table>
```
```css
td {
  padding: 0;
}
```

# Resources

* [StackOverflow - Set cellpadding and cellspacing in CSS](http://stackoverflow.com/questions/339923/set-cellpadding-and-cellspacing-in-css)
