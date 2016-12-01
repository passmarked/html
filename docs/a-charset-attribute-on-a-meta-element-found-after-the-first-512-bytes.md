In computing, a character encoding is used to represent a repertoire of characters by some kind of an encoding system.

Many exist such as:
* ACSII
* ANSI (Windows-1252)
* ISO-8859-1
* UTF-8 (Unicode)

Because *ACSII* and *ANSI* are so limited, UTF-8 is recommended for most scenarios users might encounter.

Meta tags allows setting the charset of a document using:

```html
<meta charset="UTF-8">
```

This tag is expected to be found found at the top of the head section of the page. Thus refering to this rule as *The First 512 Bytes*.

# How do I fix this ?

Fixing is a matter of making sure that the `<meta charset="UTF-8">` tag is the first element of the `<head>` section.

So something like this:

```html
<!DOCTYPE html> 
<html> 
  <head>
    <link rel="stylesheet" type="text/css" href="http://example.com/style.css" media="all" />
    <meta charset="UTF-8">
```

should be updated to the following:

```html
<!DOCTYPE html> 
<html> 
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="http://example.com/style.css" media="all" />
```

# Resources

* [How do I fix “Error: A charset attribute on a meta element found after the first 512 bytes.”](http://stackoverflow.com/questions/18007771/how-do-i-fix-error-a-charset-attribute-on-a-meta-element-found-after-the-first)
* [Character encoding](https://en.wikipedia.org/wiki/Character_encoding)
