Bad value was found for form attribute `novalidate`. This could cause unexpected behavior in the built in HTML5 form validation.

```html
<form method="post" action="test.html" novalidate="true">
```

# How do I fix this ?

According to the W3C `novalidate` attribute can only be used as follows:

```html
novalidate="novalidate"

novalidate=""

novalidate
```

Example:

```html
<form method="post" action="test.html" novalidate="novalidate">
<form method="post" action="test.html" novalidate="">
<form method="post" action="test.html" novalidate>
```

# Resources

* [W3C - HTML Markup - Forms](https://www.w3.org/TR/html-markup/form.html#form.attrs.novalidate)
* [W3C - HTML Markup - Empty Attribute Syntax](https://www.w3.org/TR/html-markup/syntax.html#syntax-attr-empty)
