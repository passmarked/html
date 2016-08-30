Invalid link type was found for attribute `rel` in `a` tag. HTML5 only allows you to use the standard link types without registering a new type.

```html
<a href="sample.html" rel="non-existing-linktype">Sample Link</a>
```

# How do I fix this ?

Use a standard link type:

| Link Type | Description |
| --- | --- |
| `alternate` | Used for an alternative page with same content that may be in a different format. |
| `author` | Used to link to the author of the content in the nearest article element or the whole page. |
| `bookmark` | Used to link to the nearest article element or section between the last element used if no article element is present. |
| `help` | Used to link to a help page for the current page. |
| `license` | Used to link to the copyright license terms for the current page or document. |
| `nofollow` | Used in a link to indicate that the link is not endorsed or of the same author of the current page. |
| `noreferrer` | Used to indicate that no referrer information is to be passed on to the next request. |
| `prefetch` | Used to indicate that the content linked to will benefit from being cached. |
| `search` | Used to indicate that the content being linked to has an interface for searching the document or related sources. |
| `tag` | Used to indicate that the content linked to is in relation to the content of the current page. |
| `next` | Used to indicate that the content linked to is the next part of the current document or page. |
| `prev` | Used to indicate that the content linked to is the previous part of the current document or page. |

```html
<a href="sample.html" rel="alternate">Sample Link</a>
```

# Resources

* [W3C - Link Types](https://www.w3.org/TR/html5/links.html#linkTypes)
* [W3C - Other Link Types](https://www.w3.org/TR/html5/links.html#other-link-types)
