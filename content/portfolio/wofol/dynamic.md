+++
title = "Dynamic Feature Demonstration"
date = 2021-11-18
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

#### Sample Tracks

**A Tall Ship** and **In A World** by Jason Shaw

*(Intentionally low quality. Find the full, high-quality tracks on [Audionautix!](https://audionautix.com/) (Creative Commons))*

{{ musicPlayer(src="/music/ATallShip.mp3",name="A Tall Ship") }} 
<br/>
{{ musicPlayer(src="/music/InAWorld.mp3",name="In A World",bk="/bk/world.jpg",hue=240) }}

**Sunset Breeze** by Lockyn

*This track's recommended if you're trying out the visualizer!*

*(Also intentionally low quality (96kpbs), please support the artist directly ([Youtube](https://www.youtube.com/watch?v=du1ds6lD8vk)/[Bandcamp](https://lockyn.me/track/sunset-breeze-2)) if you like it!)*
{{ musicPlayer(src="/music/SunsetBreeze.mp3",name="Sunset Breeze",bk="/bk/sunset.jpg",hue=30) }}

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

#### Sample Markdown

```md
{{/* musicPlayer(src="/music/ATallShip.mp3",name="A Tall Ship") */}} 
{{/* musicPlayer(src="/music/InAWorld.mp3",name="In A World",bk="/bk/world.jpg",hue=240) */}} 
{{/* musicPlayer(src="/music/SunsetBreeze.mp3",name="Sunset Breeze",bk="/bk/sunset.jpg",hue=30) */}} 
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

<!-- {{ resize_image(path="@/portfolio/wofol/example-1.jpg", width=600, height=400, op="fill") }} -->

<a class="example-image-link" href="http://lokeshdhakar.com/projects/lightbox2/images/image-1.jpg" data-lightbox="example-1"><img class="example-image" src="http://lokeshdhakar.com/projects/lightbox2/images/thumb-1.jpg" alt="image-1" /></a>

{{ lightbox(path="https://images.unsplash.com/photo-1637672531763-7b7a63b3269b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80") }}

{{ lightbox(path="../example-1.jpg") }}

{{ gallery() }}