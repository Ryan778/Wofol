/**
 * musicPlayer.js
 * (C) Ryan Zhang
 * 
 * Adds support for a cross-page music player! 
 */

const MusicPlayer = {
  audio: new Audio(), 
  currentElement: false, 
  elements: {}, 
  visualizer: {
    active: false, 
    audioContext: false, 
    activate: function() {
      if (!this.analyser || !this.audioContext) {
        this.audioContext = new AudioContext(); 
        this.src = this.audioContext.createMediaElementSource(MusicPlayer.audio); 
        this.analyser = this.audioContext.createAnalyser(); 
        this.analyser.connect(this.audioContext.destination); 
        this.analyser.fftSize = 256; 
        let analyserSize = this.analyser.frequencyBinCount; 
        this.data = new Uint8Array(analyserSize); 

        // Connect back to output
        this.src.connect(this.analyser); 
      }
      let bk = MusicPlayer.currentElement.dataset.bk; 
      if (bk !== 'none') {
        MusicPlayer.elements.canvas.style.backgroundImage = `url(${bk})`;
      } else {
        MusicPlayer.elements.canvas.style.backgroundImage = '';
      }
      // Overwrite music player hover color
      if (MusicPlayer.currentElement.dataset.hue) {
        document.documentElement.style.setProperty('--accent-color-light', `hsl(${MusicPlayer.currentElement.dataset.hue}, 100%, 80%)`);
      }
      MusicPlayer._fade(MusicPlayer.elements.canvas, 1); 
      this.active = true; 
      this.animationFrame(); 
    }, 
    deactivate: function() {
      document.documentElement.style.removeProperty('--accent-color-light');
      MusicPlayer._fade(MusicPlayer.elements.canvas, 0); 
      this.active = false; 
    },
    animationFrame: function() {
      if (this.active) {
        window.requestAnimationFrame(() => {MusicPlayer.visualizer.animationFrame()}); 
        this.analyser.getByteFrequencyData(this.data); 
        let hueBase = MusicPlayer.currentElement.dataset.hue ? parseInt(MusicPlayer.currentElement.dataset.hue) : 225; 
        let trData = this.data.slice(0, -1 * Math.floor(this.data.length / 4)); // Highest pitches are often not used
        let canvas = MusicPlayer.elements.canvas; 
        let ctx = canvas.getContext('2d');

        canvas.setAttribute('width', window.innerWidth);
        canvas.setAttribute('height', (window.innerHeight - 50));

        let cWidth = canvas.width, cHeight = canvas.height;
        ctx.clearRect(0, 0, cWidth, cHeight);

        let barWidth = ((cWidth * 1) / (trData.length)) - 1, barHeight;
        // let x = cWidth * 0.1;
        let x = 0;
        for (let i = 0; i < trData.length; i++) {
          barHeight = (trData[i]/255) * (cHeight/2) + 2;
          ctx.fillStyle = `hsla(${hueBase - (60 * i/trData.length)}deg, 100%, ${60 + ((35*trData[i]/255))}%, ${70 + (25*trData[i]/255)}%)`;
          // ctx.fillRect(x, (0.5*cHeight) - (0.5*barHeight), barWidth, barHeight);
          ctx.fillRect(x, cHeight - barHeight - 48, barWidth, barHeight);
          x += barWidth + 1;
        }
      }
    }
  }, 
  /**
 * Fades in/out the specified element. 
 * @param {object} ele - target element
 * @param {boolean} mode - 1 to show, 0 to hide (default)
 */
   _fade: async function(ele, mode=0) {
    return new Promise(r => {
      if (mode) {
        ele.style.display = 'block'; 
        ele.style.animation = `0.4s 1 normal fade-in`; 
        setTimeout(() => {
          ele.style.animation = ''; 
          r(); 
        }, 400); 
      } else {
        ele.style.animation = `0.4s 1 normal fade-out`; 
        setTimeout(() => {
          ele.style.animation = ''; 
          ele.style.display = 'none'; 
          r(); 
        }, 400); 
      }
    });
  }, 
  _updateInterval: false, 
  _updatePB: function() {
    let cur = MusicPlayer.audio.currentTime; 
    let dur = MusicPlayer.audio.duration; 
    MusicPlayer.elements.pbInner.style.width = `${100*cur/dur}%`;
    MusicPlayer.currentElement.style.background = `linear-gradient(to right, #ffffff3f 0%, #ffffff3f ${100*cur/dur - 0.01}%, transparent ${100*cur/dur}%, transparent 100%)`;
    cur = Math.floor(cur); 
    dur = Math.floor(dur); 
    MusicPlayer.elements.position.innerText = `${Math.floor(cur/60)}:${(cur % 60).toString().padStart(2, '0')} / ${Math.floor(dur/60)}:${(dur % 60).toString().padStart(2, '0')}`;
  }, 
  _createPlayer: function() {
    document.body.insertAdjacentHTML('beforeEnd', `<canvas id='musicWrapper-canvas'></canvas><div id='musicWrapper-player' style='bottom:-60px'><div id='musicWrapper-pb'><div></div></div><div id='musicWrapper-controls'><span id='musicWrapper-playPauseButton' class='material-icons' style='font-size: 36px'>play_circle_filled</span> <span class='material-icons'>replay_10</span> <span class='material-icons'>repeat_one</span> <span class='material-icons' style='display:none'>volume_up</span> <span class='material-icons'>insert_chart_outlined</span> <span class='material-icons'>expand_more</span></div><span id='musicWrapper-trackName'></span><span id='musicWrapper-position'></span></div>`);
    
    // Set elements
    this.elements.player = document.getElementById('musicWrapper-player'); 
    this.elements.canvas = document.getElementById('musicWrapper-canvas'); 
    this.elements.pbInner = document.getElementById('musicWrapper-pb').firstChild; 
    this.elements.playButton = document.getElementById('musicWrapper-playPauseButton'); 
    this.elements.position = document.getElementById('musicWrapper-position'); 
    this.elements.trackName = document.getElementById('musicWrapper-trackName');

    // Add event listeners
    let controls = document.getElementById('musicWrapper-controls').children; 
    document.getElementById('musicWrapper-pb').addEventListener('click', function(e) {
      let width = document.getElementById('musicWrapper-pb').offsetWidth; 
      let click = e.offsetX; 
      MusicPlayer.audio.currentTime = MusicPlayer.audio.duration * (click / width); 
      MusicPlayer._updatePB(); 
    }); 
    // Play/pause button
    controls[0].addEventListener('click', function() {
      if (MusicPlayer.audio.paused) {
        MusicPlayer.play(MusicPlayer.currentElement); 
      } else {
        MusicPlayer.pause(); 
      }
    });

    // Rewind 10 button
    controls[1].addEventListener('click', function() {
      MusicPlayer.audio.currentTime = Math.max(0, MusicPlayer.audio.currentTime - 10); 
      MusicPlayer._updatePB(); 
    }); 

    // Repeat track
    controls[2].addEventListener('click', function() {
      if (MusicPlayer.audio.loop) {
        MusicPlayer.audio.loop = false;
        controls[2].innerText = 'repeat_one'; 
      } else {
        MusicPlayer.audio.loop = true; 
        controls[2].innerText = 'repeat_one_on'; 
      }
    });

    // Toggle visualizer
    controls[4].addEventListener('click', function() {
      if (MusicPlayer.elements.canvas.style.display !== 'block') {
        controls[4].innerText = 'insert_chart';
        MusicPlayer.visualizer.activate(); 
      } else {
        controls[4].innerText = 'insert_chart_outlined';
        MusicPlayer.visualizer.deactivate(); 
      }
    });

    // Hide player
    controls[5].addEventListener('click', function() {
      MusicPlayer._playerHidden = true; 
      MusicPlayer.elements.player.style.bottom = '-60px';
      if (MusicPlayer.visualizer.active) {
        controls[4].innerText = 'insert_chart_outlined';
        MusicPlayer.visualizer.deactivate(); 
      }
    }); 

    // Show player
    setTimeout(() => {
      MusicPlayer.elements.player.style.bottom = '0px';
    }, 120);
  }, 
  play: function (ele, force) {
    if (this.currentElement) {
      if (ele === this.currentElement && !this.audio.paused) {
        this.pause(); 
        return; 
      }
      this.currentElement.style.background = '';
      this.currentElement.classList.remove('active'); 
      this.currentElement.firstChild.textContent = 'play_circle';
    } else {
      this._createPlayer(); 
    }
    if (ele !== this.currentElement) {
      let src = ele.dataset.src;
      this.audio.src = src; 
    }
    if (this._playerHidden) {
      this._playerHidden = false; 
      MusicPlayer.elements.player.style.bottom = '0px';
    }
    this.audio.play(); 
    ele.classList.add('active');
    ele.firstChild.textContent = 'pause_circle_outline';
    this.currentElement = ele; 

    this.elements.playButton.textContent = 'pause_circle_filled'; 
    this.elements.trackName.innerText = ele.dataset.name;
    _updateInterval = setInterval(this._updatePB, 100); 
  }, 
  pause: function() {
    clearInterval(_updateInterval); 
    this.currentElement.style.background = '';
    this.currentElement.classList.remove('active'); 
    this.currentElement.firstChild.textContent = 'play_circle_outline';
    this.elements.playButton.textContent = 'play_circle_filled'; 
    this.audio.pause(); 
  }
}

document.querySelectorAll('.musicWrapper-nolib').forEach(ele => {
  let newEle = document.createElement('button'); 
  if (ele.id) {
    newEle.id = ele.id }
  newEle.className = 'musicWrapper'; 
  newEle.tabIndex = '0'
  newEle.dataset.src = ele.src;
  newEle.dataset.name = ele.dataset.name; 
  newEle.dataset.bk = ele.dataset.bk ? ele.dataset.bk : 'none'; 
  newEle.dataset.hue = ele.dataset.hue ? ele.dataset.hue : '225'; 
  newEle.innerText = newEle.dataset.name; 
  newEle.addEventListener('click', () => {MusicPlayer.play(newEle)}); 
  newEle.insertAdjacentHTML('afterBegin', `<span class='material-icons'>play_circle_outline</span>`);
  ele.insertAdjacentElement('afterEnd', newEle); 
  ele.parentElement.removeChild(ele); 
}); 