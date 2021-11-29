+++
title = "Dynamic Feature Demonstration"
description = "Dynamic features in Wofol!"
date = 2021-11-18

[extra] 
header = "header.jpg"
+++

Sometimes, you want something a little *fancier*. These components all continue to use the same simple and intuitive shortcodes markdown-wise, but behind the scenes use JavaScript "plugins" to work!

## Music Player
Plays music!
- **Requirements**: `js/plugins/musicPlayer.js` and `css/plugins/musicPlayer.css` loaded
- **Features**: 
  - Works in any page
  - Inline progress bar *and* full-size progress bar in popup
  - Supports volume adjustments, rewinding, and toggling repeat
  - Built-in visualizer! (Customizable colors and background -- see below)
  - Also works as a static component -- if you call it without the CSS/JS files, it'll render as a native inline audio player

### Sample Tracks

**A Tall Ship** and **In A World** by Jason Shaw

*(Intentionally low quality. Find the full, high-quality tracks on [Audionautix!](https://audionautix.com/) (Creative Commons))*

{{ musicPlayer(src="/music/ATallShip.mp3",name="A Tall Ship") }} 
<br/>
{{ musicPlayer(src="/music/InAWorld.mp3",name="In A World",bk="/bk/world.jpg",hue=240) }}

**Sunset Breeze** by Lockyn

*This track's recommended if you're trying out the visualizer!*

*(Also intentionally low quality (96kpbs), please support the artist directly ([Youtube](https://www.youtube.com/watch?v=du1ds6lD8vk)/[Bandcamp](https://lockyn.me/track/sunset-breeze-2)) if you like it!)*
{{ musicPlayer(src="/music/SunsetBreeze.mp3", name="Sunset Breeze", bk="/bk/sunset.jpg",hue=30) }}

**Want to try your own track?**

<input id='demo-mp-fileUpload' type='file' accept='audio/*'><br/>

<div id='demo-mp-playDiv' style='display: none'>
{{ musicPlayer(id="demo-mp-play",src="",name="Custom Track",bk="/bk/world.jpg",hue=240) }}
</div>

<script>
  document.getElementById('demo-mp-fileUpload').onchange = function() {
    var files = this.files;
    document.getElementById('demo-mp-playDiv').style.display = 'block';
    document.getElementById('demo-mp-play').dataset.src = URL.createObjectURL(files[0]);
  }; 
</script> 

### Example Markdown

```md
{{/* musicPlayer( src="/music/ATallShip.mp3", name="A Tall Ship" ) */}} 
{{/* musicPlayer( src="/music/InAWorld.mp3", name="In A World",bk="/bk/world.jpg", hue=240) */}} 
{{/* musicPlayer( src="/music/SunsetBreeze.mp3", name="Sunset Breeze", bk="/bk/sunset.jpg", hue=30) */}} 
```

## Gallery
Separate images/multimedia/anything else by categories. 
- **Requirements**: `js/plugins/gallery.js` and `css/plugins/gallery.css`
- **Features**: 
  - Works with any element
  - Simply add a class
- **Use Cases**: 
  - Separate desktop and mobile screenshots
  - Separate final product images and mockups/drafts

## Lightbox

Generate quick, simple, and interactable galleries of images.

### Samples
Aspect ratio is preserved in the first two images, 1:1 aspect ratio is used for the second two.

{{ lightbox(path="example-1.jpg", caption="Tokyo, Japan | Gene Brutty") }}
{{ lightbox(path="example-2.jpg", caption="Ocean | Pawel Nolbert") }}
{{ lightbox(path="example-1.jpg", caption="Tokyo, Japan | Gene Brutty", square=1)}}
{{ lightbox(path="example-2.jpg", caption="Ocean | Pawel Nolbert", square=1) }}

A custom width/height can also be specified.

{{ lightbox(path="example-3.jpg", caption="Tushar Mountains | Patrick Hendry", fullwidth=1, height=480) }}

### Example Markdown

*Note that if you specify width/height, the image will always be constrained by the lower of the two values.*

```md
{{/* lightbox(path="example-1.jpg") */}} <!-- No caption, keeping aspect ratio -->
{{/* lightbox(path="example-1.jpg", caption="Hello World!", square=1) */}} <!-- Caption + cropping to 1:1 -->
{{/* lightbox(path="example-3.jpg", fullwidth=1, height=480) */}} <!-- Use "fullwidth=1" to specify 100% width -->
```

## Table of Contents
Always a useful tool for long pages. 
- **Requirements**: No additional plugins needed, but does require JavaScript to function.
- **Features**: 
  - Generated completely automatically, requires no additional code from you!  
    (based on the headers in your markdown file, top two levels only by default)
  - Sticky popup that stays out of your way when not being used
  - Scroll offset is automaticallly calculated to account for sticky header

### Samples
Look at the top right corner of your screen to see Table of Contents in action!