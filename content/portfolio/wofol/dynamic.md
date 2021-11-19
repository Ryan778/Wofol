+++
title = "Dynamic Feature Demonstration"
date = 2021-11-18
+++

Sometimes, you want something a little *fancier*. These components all continue to use the same simple and intuitive shortcodes markdown-wise, but behind the scenes use JavaScript "plugins" to work!

## Music Player
Plays music!
- **Requirements**: `js/plugins/musicPlayer.js` and `css/plugins/musicPlayer.css` loaded
- **Features**: 
  - Works across pages (fixed bottom overlay)
  - Supports volume adjustments, changing playback rate, and repeats.
  - Built-in visualizer!
  - Also works as a static component -- if you call it without the CSS/JS files, it'll render as a native inline   audio player.

Example: 

*[Music by Jason Shaw on Audionautix (CC)](https://audionautix.com/)*

{{ musicPlayer(src="/music/ATallShip.mp3") }} 
{{ musicPlayer(src="/music/InAWorld.mp3") }}