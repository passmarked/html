You have used the element `<style>` inside a `<div>` tag. This element is only allowed in the `<head>` section of your document.

```html
<div>
    <style type="text/css">
        This is not allowed.
    </style>
</div>
```

# How do I fix this ?

Move the styles to your `<head>` section or use external stylesheets.

You can also use the `scoped` attribute to apply styles to specific parent elements and their children. Being a new attribute support may vary among major browsers.

When adding the attribute `scoped` it becomes possible to add styles to `<div>` elements:

```html
<div>
    <style scoped>
        h1 {color:red;}
        p {color:blue;}
    </style>
<h1>This is a heading</h1>
<p>This is a paragraph.</p>
</div>
```
# Resources

* [Style scoped](http://www.w3schools.com/tags/att_style_scoped.asp)
* [Styles in body](http://stackoverflow.com/questions/2830296/using-style-tags-in-the-body-with-other-html)
* [Styles in tags](http://stackoverflow.com/questions/1385384/style-tag-inside-any-elements-will-still-work)
