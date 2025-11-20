// Enhanced reveals for about sections
document.addEventListener('DOMContentLoaded', () => {
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    // Hero entrance
    gsap.from('.about-hero .hero-title', {y: 50, opacity: 0, duration: 1.2, ease: 'power3.out'});
    // Stagger bio paragraphs
    gsap.from('.bio-content p', {
      scrollTrigger: {trigger: '.bio', start: 'top 80%'},
      y: 30, opacity: 0, duration: .8, stagger: .3, ease: 'power2.out'
    });
    // Skills/collabs pop-in
    gsap.from('.skills li, .collabs li', {
      scrollTrigger: {trigger: '.skills, .collabs', start: 'top 85%'},
      scale: 0.9, opacity: 0, duration: .6, stagger: .1, ease: 'back.out(1.7)'
    });
  }
});