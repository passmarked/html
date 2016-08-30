The `alt` attribute (sometimes incorrectly named an _alt tag_) is used by screen reader software to provide an alternate to viewing images, i.e. for a person who is listening to the content of a webpage. The _alt text_ is also used by text-based browsers and browsers that have been configured to not display images. Search engines also place a relatively high value on alt text to determine the contents of an image, but also to determine the topic of the surrounding text.

# Missing Alt Attribute

Some screen readers read out "image" or the filename of an image when the `alt` attribute is missing. Most of the time, this will confuse your users.

```html
<!-- BAD, missing alt attribute -->
<img src="images/DSC00042.jpg">
```

# How do I fix this ?

Always add *descriptive* `alt` text to your images. Sometimes the function or the information an image is conveying is already present within the test of the page surrounding the image. In this case, a lengthy `alt` attribute isn't necessary — use a simple description instead.

```html
<!-- Good: description of scene in image-->
<img src="images/luna.jpg" alt="Pet cat, Luna, playing with yarn.">
```

```html
<!-- Good: simple alt attribute with accompanying information -->
<img src="images/mona-lisa.jpg" alt="Mona Lisa">
<p>The Mona Lisa is a half-length portrait of a woman by the Italian artist Leonardo da Vinci, which has been acclaimed as "the best known, the most visited, the most written about, the most sung about, the most parodied work of art in the world." The painting, thought to be a portrait of Lisa Gherardini, the wife of Francesco del Giocondo, is in oil on a poplar panel, and is believed to have been painted between 1503 and 1506.</p> <!-- Wikipedia -->
```

# Better Alt attributes

Always try to describe the scene in detail — "Dalmation puppy playing fetch" is better than only "puppy".

# Decorative images

Decorative or layout-related `img` tags should be transitioned to css-based images if possible. If not, an empty `alt` attribute should be set, which will cause screen readers to simply skip the image. Otherwise screen reader users will have it read to them.

```html
<!-- BAD, alt text for decorative images -->
<img src="images/line.jpg" alt="divider">
```

# Avoid Keyword Stuffing

Don't stuff `alt` attributes with keywords (See: [Irrelevant Keywords](https://support.google.com/webmasters/answer/66358) ). This confuses screen reader users and you will be penalized in your search rankings.

```html
<!-- BAD, keyword stuffed alt text -->
<img src="image/logo.png" alt="cat, toy, pet, pets, animals">
```

# Resources

* [NC State University - Alternative Text Accessibility](https://accessibility.oit.ncsu.edu/training/accessibility-handbook/alternative-text.html)
* [Yoast - Image SEO](https://yoast.com/image-seo-alt-tag-and-title-tag-optimization/)
* [Google — Image publishing guidelines](https://support.google.com/webmasters/answer/114016?hl=en)
* [Image ALT tag tips](http://accessibility.psu.edu/images/imageshtml/)
