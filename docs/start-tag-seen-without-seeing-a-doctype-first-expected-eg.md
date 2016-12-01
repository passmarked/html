You really do need a DOCTYPE at the start of your HTML document. It enables standards mode in your browser to avoid bad quirks mode.

# How to fix

Just add a DOCTYPE to the start of your document:
```
<!DOCTYPE html>
<html>
 <!-- The rest goes here -->
```
That is for HTML5 which is the recommended way forward.

Any html4 DOCTYPE's just won't do anymore:
```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```
