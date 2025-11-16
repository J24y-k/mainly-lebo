// light interaction: clicking view will open file in new tab
document.addEventListener('click', e => {
  if (e.target.matches('.view')) {
    e.preventDefault();
    const url = e.target.getAttribute('href');
    window.open(url, '_blank', 'noopener');
  }
});
