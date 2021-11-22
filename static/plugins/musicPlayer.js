/**
 * musicPlayer.js
 * (C) Ryan Zhang
 * 
 * Adds support for a cross-page music player! 
 */

const MusicPlayer = {
  audioContext: new Audio(), 
  currentElement: false, 
  elements: {}, 
  _updateInterval: false, 
  _updatePB: function() {
    let cur = MusicPlayer.audioContext.currentTime; 
    let dur = MusicPlayer.audioContext.duration; 
    MusicPlayer.elements.pbInner.style.width = `${100*cur/dur}%`;
    cur = Math.floor(cur); 
    dur = Math.floor(dur); 
    MusicPlayer.elements.position.innerText = `${Math.floor(cur/60)}:${(cur % 60).toString().padStart(2, '0')} / ${Math.floor(dur/60)}:${(dur % 60).toString().padStart(2, '0')}`;
  }, 
  _createPlayer: function() {
    document.body.insertAdjacentHTML('beforeEnd', `<div id='musicWrapper-player'><div id='musicWrapper-pb'><div></div></div><div id='musicWrapper-controls'><span id='musicWrapper-playPauseButton' class='material-icons-outlined' style='font-size: 36px'>play_circle_filled</span> <span class='material-icons-outlined'>replay_10</span><span class='material-icons-outlined'>repeat</span> <span class='material-icons-outlined'>bar_chart</span> <span class='material-icons-outlined'>expand_more</span></div><span id='musicWrapper-trackName'></span><span id='musicWrapper-position'></span></div>`);
    this.elements.pbInner = document.getElementById('musicWrapper-pb').firstChild; 
    document.getElementById('musicWrapper-pb').addEventListener('click', function(e) {
      let width = document.getElementById('musicWrapper-pb').offsetWidth; 
      let click = e.offsetX; 
      MusicPlayer.audioContext.currentTime = MusicPlayer.audioContext.duration * (click / width); 
      MusicPlayer._updatePB(); 
    }); 
    this.elements.playButton = document.getElementById('musicWrapper-playPauseButton'); 
    this.elements.position = document.getElementById('musicWrapper-position'); 
    this.elements.playButton.addEventListener('click', function() {
      if (MusicPlayer.audioContext.paused) {
        MusicPlayer.play(MusicPlayer.currentElement); 
      } else {
        MusicPlayer.pause(); 
      }
    });
    this.elements.trackName = document.getElementById('musicWrapper-trackName');
  }, 
  play: function (ele, force) {
    if (this.currentElement) {
      if (ele === this.currentElement && !this.audioContext.paused) {
        this.pause(); 
        return; 
      }
      this.currentElement.classList.remove('active'); 
      this.currentElement.firstChild.textContent = 'play_circle';
    } else {
      this._createPlayer(); 
    }
    if (ele !== this.currentElement) {
      let src = ele.dataset.src;
      this.audioContext.src = src; 
    }
    this.audioContext.play(); 
    ele.classList.add('active');
    ele.firstChild.textContent = 'pause_circle';
    this.currentElement = ele; 

    this.elements.playButton.textContent = 'pause_circle_filled'; 
    this.elements.trackName.innerText = ele.dataset.name;
    _updateInterval = setInterval(this._updatePB, 100); 
  }, 
  pause: function() {
    this.currentElement.classList.remove('active'); 
    this.currentElement.firstChild.textContent = 'play_circle';
    this.elements.playButton.textContent = 'play_circle_filled'; 
    this.audioContext.pause(); 
    clearInterval(_updateInterval); 
  }
}

document.querySelectorAll('.musicWrapper-nolib').forEach(ele => {
  let newEle = document.createElement('button'); 
  newEle.className = 'musicWrapper'; 
  newEle.tabIndex = '0'
  newEle.dataset.src = ele.src;
  newEle.dataset.name = ele.dataset.name; 
  newEle.innerText = newEle.dataset.name; 
  newEle.addEventListener('click', () => {MusicPlayer.play(newEle)}); 
  newEle.insertAdjacentHTML('afterBegin', `<span class='material-icons-outlined'>play_circle</span>`);
  ele.insertAdjacentElement('afterEnd', newEle); 
  ele.parentElement.removeChild(ele); 
}); 

// MusicPlayer._createPlayer(); 