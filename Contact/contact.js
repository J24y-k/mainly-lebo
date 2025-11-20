// Light enhancements
document.addEventListener('DOMContentLoaded', () => {
  // Rel for security
  document.querySelectorAll('a[target="_blank"]').forEach(a => a.setAttribute('rel', 'noopener noreferrer'));
  // GSAP button staggers
  if (window.gsap) {
    gsap.from('.contact-cards .btn', {
      y: 20, opacity: 0, duration: .6, stagger: .2, ease: 'power2.out'
    });
  }
});