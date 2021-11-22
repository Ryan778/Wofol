/**
 * 3dCards.js
 * (C) Ryan Zhang
 * 
 * Adds a 3d/glow effect onto portfolio entry cards that follow the mouse cursor. 
 */

document.querySelectorAll('.portfolio-grid-item').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    let x = (e.offsetX / el.offsetWidth); 
    let y = (e.offsetY / el.offsetHeight); 
    el.style.transform = `scale(1.03) rotate3d(${-2*y+1}, ${2*x-1  }, 0, ${Math.min(24*(Math.abs(0.5-x) + Math.abs(0.5-y)), 12)}deg`;
    el.style.background = `radial-gradient(farthest-corner at ${100*x}% ${100*y}%, #ffffff40 0%, #ffffff10 100%)`
  });
  el.addEventListener('mousedown', (e) => {
    let x = (e.offsetX / el.offsetWidth); 
    let y = (e.offsetY / el.offsetHeight); 
    el.style.transform = `scale(1.03) rotate3d(${-2*y+1}, ${2*x-1  }, 0, ${Math.min(24*(Math.abs(0.5-x) + Math.abs(0.5-y)), 12)}deg`;
    el.style.background = `radial-gradient(farthest-corner at ${100*x}% ${100*y}%, #ccccff50 0%, #ffffff10 100%)`
  });
  el.addEventListener('mouseout', (e) => {
    el.style.transform = '';
    el.style.background = '';
  }); 
});