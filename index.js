// index.js — header hamburger, footer year, simple GSAP hero animation & reveal
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // hamburger toggle
  const btn = document.getElementById('hamburger');
  const mobile = document.getElementById('mobile-menu');
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if (!expanded) {
      mobile.hidden = false;
    } else {
      mobile.hidden = true;
    }
  });

  // GSAP animations
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    // hero entrance
    gsap.from('.hero-title',{y:30,opacity:0,duration:1,ease:'power3.out'});
    gsap.from('.hero-sub',{y:18,opacity:0,duration:1,delay:.15});
    gsap.from('.hero-cta .btn',{y:8,opacity:0,duration:.6,stagger:.12,delay:.35});

    // reveal cards on scroll
    const cards = document.querySelectorAll('.card');
    gsap.utils.toArray(cards).forEach(card => {
      gsap.from(card, {
        scrollTrigger: {trigger: card, start: 'top 85%'},
        y: 20,
        opacity: 0,
        duration: .7,
        ease: 'power2.out'
      });
    });
  }
});
