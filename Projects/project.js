// Enhanced: GSAP reveals + interactions
document.addEventListener('DOMContentLoaded', () => {
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.projects-page h1', {y: 40, opacity: 0, duration: 1, ease: 'power3.out'});
    gsap.from('.project', {
      scrollTrigger: {trigger: '.grid', start: 'top 80%'},
      y: 50, opacity: 0, duration: .8, stagger: .3, ease: 'power2.out'
    });
  }
  // View links (open new tab)
  document.addEventListener('click', e => {
    if (e.target.matches('.view')) {
      e.preventDefault();
      window.open(e.target.href, '_blank', 'noopener');
    }
  });
});