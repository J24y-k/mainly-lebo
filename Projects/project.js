// ===================================
// PORTFOLIO PAGE ANIMATIONS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  initPortfolioAnimations();
});

function initPortfolioAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero entrance
  gsap.from('.portfolio-hero .section-label', {
    y: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });
  
  gsap.from('.portfolio-hero h1', {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out'
  });
  
  gsap.from('.portfolio-hero p', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: 'power2.out'
  });
  
  // Featured project (World Cup)
  gsap.from('.project-media', {
    scrollTrigger: {
      trigger: '.featured-project',
      start: 'top 70%'
    },
    scale: 0.9,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.from('.project-tag', {
    scrollTrigger: {
      trigger: '.featured-project',
      start: 'top 70%'
    },
    x: -30,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out'
  });
  
  gsap.from('.project-details h2', {
    scrollTrigger: {
      trigger: '.featured-project',
      start: 'top 70%'
    },
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: 'power3.out'
  });
  
  gsap.from('.project-lead', {
    scrollTrigger: {
      trigger: '.featured-project',
      start: 'top 70%'
    },
    y: 20,
    opacity: 0,
    duration: 0.8,
    delay: 0.6,
    ease: 'power2.out'
  });
  
  gsap.from('.project-stats .stat', {
    scrollTrigger: {
      trigger: '.project-stats',
      start: 'top 80%'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'back.out(1.7)'
  });
  
  gsap.from('.project-description p', {
    scrollTrigger: {
      trigger: '.project-description',
      start: 'top 85%'
    },
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  });
  
  gsap.from('.project-links .btn', {
    scrollTrigger: {
      trigger: '.project-links',
      start: 'top 85%'
    },
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'back.out(1.7)'
  });
  
  // Project cards
  gsap.from('.project-card', {
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 75%'
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  });
  
  // Parallax on featured image (only if element exists)
  const projectMediaImg = document.querySelector('.project-media img');
  if (projectMediaImg) {
    gsap.to('.project-media img', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.project-media',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }
}