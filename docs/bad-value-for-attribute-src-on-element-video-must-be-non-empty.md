Bad value was found in `src` attribute for video element. According to the W3C the `src` attribute for the video element must contain a valid non-empty url. This could lead to unexpected behavior in browsers such as Internet Explorer or make an unwanted request.

```html
<video src=""></video>
```

# How do I fix this ?

Either add a valid `src` URL or remove the `src` attribute if one will be added dynamically.

```html
<video id="test" src="/video/test.mp4"></video>

<video id="test"></video>
```

# Resources

* [W3C - Embedded Content - Media](https://www.w3.org/TR/html5/embedded-content-0.html#attr-media-src)
* [W3C - Video - src](https://www.w3.org/TR/2011/WD-html5-20110113/video.html#attr-media-src)
