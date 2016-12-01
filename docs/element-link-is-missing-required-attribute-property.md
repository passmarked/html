The `<link>` element is missing a required attribute. The resource might fail to load correctly.

# How do I fix this ?

At its core the `<link>` tag should look like the following:

```html
<link href="style.css" rel="stylesheet">
```

If you are using the tag in your `<body>` section add `property='stylesheet'`:

```html
<link href="style.css" property='stylesheet' rel="stylesheet">
```

# Resources

* [Link attributes missing](http://stackoverflow.com/questions/18549726/element-link-is-missing-required-attribute-property)
* [MDN link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#Examples)
