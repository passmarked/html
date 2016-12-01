This error will occur when the browser can't decode certain characters used in your content.

# How do I fix this ?

The following ways can be used to approach this problem:

* Add `<meta charset="UTF-8">` to your `<head>`
* Make sure your editor saves files in the correct encoding.
* Make sure your content is being saved in the correct encoding in your database.
* Be sure to send the encoding yourself using the technology you're using. For example in PHP `header('Content-Type:text/html; charset=UTF-8');`
* When using Apache you can add `AddCharset UTF-8 .html` to the .htaccess file, or `AddDefaultCharset UTF-8`
* When using Nginx you can add `http { charset utf-8; }` to your `nginx.conf` file.


# Resources

* [HTML charset](http://www.w3schools.com/html/html_charset.asp)
* [How to Avoid Character Encoding Problems](https://webmonkeyuk.wordpress.com/2011/04/23/how-to-avoid-character-encoding-problems-in-php/)
* [UTF-8: The Secret of Character Encoding](http://htmlpurifier.org/docs/enduser-utf8.html#fixcharset-server-php)
* [UTF-8 Nginx](http://stackoverflow.com/questions/19772955/utf-8-not-working-nginx)
