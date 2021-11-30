const Folders = {
  _counter: 0
}

document.querySelectorAll('._folder-divider').forEach(ele => {
  let _folders_uid = Folders._counter; 
  let raw = ele.innerHTML; 
  let cn = `_folder-btn _folder-btn-${_folders_uid}`; // Class name of buttons
  raw = raw.split('\n').map(input => {
    let newEle = document.createElement('button'); 
    let params = input.split(','); 
    newEle.className = cn; 
    if (params[1].match(/icon:.[A-z_]+/)) {
      params[1] = params[1].replace(/icon:.[A-z_]+/g, (match) => {
        return `<span class='material-icons'>${match.slice(5)}</span>`;
      }); 
    }
    newEle.innerHTML = params[1]; 
    newEle.addEventListener('click', () => {
      if (document.querySelector(`._folder-btn._folder-btn-active`) === newEle) {
        return; 
      }

      if (document.querySelector(`._folder-btn._folder-btn-active`)) {
        document.querySelector(`._folder-btn._folder-btn-active`).classList.remove('_folder-btn-active');
      }
      document.querySelectorAll(`._folder-item-${_folders_uid}`).forEach(ele => ele.style.display = 'none'); 
      document.querySelectorAll(`.${params[0]}`).forEach(ele => ele.style.display = ''); 
      newEle.classList.add('_folder-btn-active');
    });

    document.querySelectorAll(`.${params[0]}`).forEach(ele => {
      ele.classList.add(`_folder-item-${_folders_uid}`); 
    }); 

    return newEle; 
  }); 
  ele.innerHTML = ''; 
  for (newEle of raw) {
    ele.insertAdjacentElement('beforeEnd', newEle); 
  }
  raw[0].click(); 
  Folders._counter ++; 
});