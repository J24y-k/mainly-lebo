// Enhanced: Hero carousel, more GSAP life
document.addEventListener('DOMContentLoaded', () => {
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Hamburger (improved toggle)
  const btn = document.getElementById('hamburger');
  const mobile = document.getElementById('mobile-menu');
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    mobile.hidden = expanded;
  });

  // Hero Image Carousel (auto-fade every 5s, pause on hover)
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    const pictures = document.querySelectorAll('.hero-picture');
    let tl = gsap.timeline({repeat: -1, defaults: {duration: 5}});
    pictures.forEach((pic, i) => {
      tl.to(pic, {opacity: i === 0 ? .1 : 0}, i * 5)
        .to(pic, {className: '+=active'}, i * 5);
    });
    document.querySelector('.hero').addEventListener('mouseenter', () => tl.pause());
    document.querySelector('.hero').addEventListener('mouseleave', () => tl.play());

    // Hero entrance (staggered, alive)
    gsap.from('.hero-title', {y: 50, opacity: 0, duration: 1.2, ease: 'power3.out'});
    gsap.from('.hero-sub', {y: 30, opacity: 0, duration: 1, delay: .3, ease: 'power3.out'});
    gsap.from('.hero-cta .btn', {y: 20, opacity: 0, duration: .8, stagger: .2, delay: .6, ease: 'back.out(1.7)'});

    // Trust items stagger
    gsap.from('.trust-item', {
      scrollTrigger: {trigger: '.trust', start: 'top 80%'},
      y: 30, opacity: 0, duration: .8, stagger: .2, ease: 'power2.out'
    });

    // Cards reveal + hover (alive interaction)
    const cards = document.querySelectorAll('.card');
    gsap.utils.toArray(cards).forEach(card => {
      gsap.from(card, {
        scrollTrigger: {trigger: card, start: 'top 85%'},
        y: 40, rotationX: -10, opacity: 0, duration: 1, ease: 'power3.out'
      });
      card.addEventListener('mouseenter', () => gsap.to(card, {scale: 1.05, duration: .3, ease: 'power2.out'}));
      card.addEventListener('mouseleave', () => gsap.to(card, {scale: 1, duration: .3, ease: 'power2.out'}));
    });

    // Parallax on hero images
    gsap.to('.hero-picture', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {trigger: '.hero', start: 'top bottom', end: 'bottom top', scrub: true}
    });
  }
});