document.getElementById('_page-toc-a').addEventListener('click', (e) => {
  e.preventDefault(); 
  let toc = document.getElementById('_page-toc'); 
  if (toc.style.display === 'block') {
    toc.style.display = 'none'; 
  } else {
    toc.style.display = 'block'; 
  }
});
document.querySelectorAll('._page-toc-item').forEach((ele) => {
  let toc = document.getElementById('_page-toc'); 
  ele.addEventListener('click', (e) => {
    e.preventDefault();
    let hash = ele.href.slice(ele.href.lastIndexOf('#'));
    location.hash = hash.slice(1); 
    toc.style.display = 'none'; 
    if (hash === '#') {
      window.scrollTo(0, 0); 
    } else {
      let target = document.querySelector(hash); 
      window.scrollTo(0, target.offsetTop + 24);
    }
  });
});