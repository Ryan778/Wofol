document.querySelectorAll('._brand-icon-shell').forEach(async ele => {
  const BASE_URL = 'https://cdn.jsdelivr.net/npm/simple-icons@6.4.0/icons/$id.svg';
  const URL = BASE_URL.replace('$id', ele.dataset.icon); 
  const COLOR = ele.dataset.color ? `${ele.dataset.color}` : '#fff';

  let newEle = document.createElement('span'); 
  if (ele.id) {
    newEle.id = ele.id }
  newEle.className = 'brand-icon';
  // console.log(ele.dataset.icon);

  let svgData = await fetch(URL).then(r => r.text());
  svgData = svgData.replaceAll('<path', `<path fill='${COLOR}'`);

  newEle.innerHTML = svgData; 
  let svgEle = newEle.firstElementChild; 
  // svgEle.style.width = '32px';
  // newEle.style.width = '36px';
  // newEle.style.margin = '0 0 4px 4px';
  newEle.title = svgEle.firstElementChild.textContent;

  ele.insertAdjacentElement('afterEnd', newEle); 
  ele.parentElement.removeChild(ele); 
}); 