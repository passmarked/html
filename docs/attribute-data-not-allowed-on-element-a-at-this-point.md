The attribute `data` is not allowed on `<a>` elements at this time.

```html
<a href="www.google.com" data="search">Google</a>
```

It should be:

```html
<a href="www.google.com" data-name="search">Google</a>
```

# How do I fix this ?

Use the `data-*` attributes to attach custom attributes to the element.

The following attributes are allowed for this element:

* href
* target
* download
* ping
* rel
* hreflang
* type

# Resources

* [The a element](https://html.spec.whatwg.org/multipage/semantics.html#the-a-element)
* [a element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)
