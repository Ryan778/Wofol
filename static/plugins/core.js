/** core.js
 * (C) 2022 Ryan Zhang
 * 
 * Contains helper functions commonly used by other plugins to help reduce duplicate code
 * - Dropdown: Elements with the "_dropdown-trigger" class are automatically bound to trigger div dropdowns based on the element specified under "data-target". The dropdown itself should have the "_dropdown" class. 
 * - Fade: _rcore.fade is a dependency free, CSS based animation function designed to replace jQuery's fade effects (and offer more customizability). 
 */

const _rcore = {
  _activeDropdown: null, 
  /**
   * Fades in/out the specified element. 
   * @param {object} ele - target element
   * @param {boolean} mode - 1 to show, 0 to hide (default)
   * @param {string} [type="fade"] - animation type, choose between ["fade", "zoom", "slide"]
   * @param {number} [duration=0.24] - animation duration, in seconds
   */
  fade: async function(ele, mode=0, type='fade', dur=0.16) {
    return new Promise(r => {
      if (mode) {
        ele.style.display = 'block'; 
        ele.style.animation = `${dur}s ease-in 0s 1 normal anim-${type}`; 
        setTimeout(() => {
          ele.style.animation = ''; 
          r(); 
        }, 1000*dur); 
      } else {
        ele.style.animation = `${dur}s ease-out 0s 1 reverse anim-${type}`; 
        setTimeout(() => {
          ele.style.animation = ''; 
          ele.style.display = 'none'; 
          r(); 
        }, 1000*dur); 
      }
    });
  }, 
}

document.querySelectorAll('._dropdown-trigger').forEach(ele => {
  ele.addEventListener('click', () => {
    let target = document.getElementById(ele.dataset.target); 
    _rcore.fade(target, 1, 'zoom').then(() => {
      _rcore._activeDropdown = target;
    });
  });
}); 

document.body.addEventListener('click', (e) => {
  if (_rcore._activeDropdown) {
    // console.log(e); 
    if (e.path) {
      for (let ele of e.path) {
        if (ele?.classList?.contains('_dropdown')) {
          return; 
        }
      }
    }
    _rcore.fade(_rcore._activeDropdown, 0, 'zoom');
    _rcore._activeDropdown = null; 
  }
});