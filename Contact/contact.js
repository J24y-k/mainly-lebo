// no heavy logic here, keep it simple for now
document.addEventListener('DOMContentLoaded', () => {
  // accessibility: open external links in new tab with noopener
  document.querySelectorAll('a[target="_blank"]').forEach(a => {
    a.setAttribute('rel', 'noopener noreferrer');
  });
});
