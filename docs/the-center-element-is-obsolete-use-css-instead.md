The `<center>` tag was a easy way to quickly center children under it. The tag, however, was deprecated in HTML5 with the reasoning that it defines the presentation instead of describing the content. For the semantic web HTML needs to clearly describe content instead.

An example of use was:

```html
<center>
  <p>Will be centered</p>
</center>
```

# How do I fix this ?

To fix simply remove any `<center>` tags and define the presentation in CSS.

For example instead of `<center>` use the following:

```html
<div style="text-align:center">
  <p>Will be centered</p>
</div>
```

Another method of centering is to set the margin-left and margin-right properties of the element to auto, and then set the parent element's text-align property to center. This guarantees that the element will be centered in all modern browsers.

# Resources

* [The center element is obsolete. Use CSS instead.](http://help.simplytestable.com/errors/html-validation/the-x-element-is-obsolete-use-css-instead/the-center-element-is-obsolete-use-css-instead/)
* [Why is the <center> tag deprecated in HTML?](http://stackoverflow.com/questions/1798817/why-is-the-center-tag-deprecated-in-html)
