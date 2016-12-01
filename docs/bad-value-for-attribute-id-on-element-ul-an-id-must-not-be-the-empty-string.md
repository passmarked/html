You have set in empty `id` attribute on an `ul` element, which is not valid according to the W3C spec.

> ID and NAME tokens must begin with a letter ([A-Za-z]) and may be followed by any number of letters, digits ([0-9]), hyphens ("-"), underscores ("_"), colons (":"), and periods (".").

# How do I fix this ?

Either remove the empty id attribute, if it is not needed for linking/scripting purposes, or set a valid value. If the `id` is generated server-size, try to only print it out conditionally (only if a valid value is set).

# Resources

* [W3 — Basic HTML data types](https://www.w3.org/TR/html4/types.html#type-id)
