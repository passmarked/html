Bad value was found for `input` attribute `name`. According to the W3C `name` attribute cannot be empty. This may cause an empty value submission when the form is posted.

```html
<input type="text" name="" />
```

# How do I fix this ?

Specify an input name.

```html
<input type="text" name="email" />
```

# Resources

* [W3C - HTML Forms](https://www.w3.org/TR/html5/forms.html#attr-fe-name)
