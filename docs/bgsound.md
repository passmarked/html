Sounds on websites have rough history. While playing sounds can give more options to grab a users attention, using `<bgsound>` is generally seen as very **BAD** form.

There are various ways to play sounds using Javscript that use common standards which can be used rather.

The big issue with using `<bgsound>` is that users have no way to control when the sound starts and no way to stop it.

# How do I fix this ?

Playing audio can happen straight from plain javascript in most popular browsers:

```
var audio = new Audio('sound.mp3');
audio.play();
```

Frameworks such as [howler.js](http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library) also exist that provides more features in multiple browsers. 

# Resources

* [howler.js](http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library)
* [HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)
* [Playing audio with Javascript](http://stackoverflow.com/questions/9419263/playing-audio-with-javascript)
* [Is using bgsound a bad idea](https://www.thecodingforums.com/threads/is-using-bgsound-a-bad-idea.687818/)
