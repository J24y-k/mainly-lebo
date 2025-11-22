// ===================================
// ABOUT PAGE - ENHANCED INTERACTIONS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  initAboutHeroCarousel();
  initAboutAnimations();
});

// ===================================
// HERO CAROUSEL FOR ABOUT PAGE
// ===================================
function initAboutHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slider .hero-slide');
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  let isPaused = false; // FIXED: Add hover pause like index.js
  
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }
  
  function nextSlide() {
    if (isPaused) return;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  // Auto-advance every 6 seconds
  setInterval(nextSlide, 6000);
  
  // FIXED: Pause on hover
  const hero = document.querySelector('.about-hero');
  if (hero) {
    hero.addEventListener('mouseenter', () => { isPaused = true; });
    hero.addEventListener('mouseleave', () => { isPaused = false; });
  }
}

// ===================================
// GSAP ANIMATIONS
// ===================================
function initAboutAnimations() {
  // FIXED: Consistent check for both GSAP and ScrollTrigger
  if (!window.gsap || !window.ScrollTrigger) return;
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero entrance
  gsap.from('.about-hero .hero-badge', {
    y: -30,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out'
  });
  
  gsap.from('.about-hero h1', {
    y: 50,
    opacity: 0,
    duration: 1.2,
    delay: 0.4,
    ease: 'power3.out'
  });
  
  gsap.from('.about-hero .hero-tagline', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: 'power3.out'
  });
  
  gsap.from('.hero-stat', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    delay: 0.8,
    ease: 'back.out(1.7)'
  });
  
  // Story section
  gsap.from('.story-section .section-label', {
    scrollTrigger: {
      trigger: '.story-section',
      start: 'top 75%'
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });
  
  gsap.from('.story-section h2', {
    scrollTrigger: {
      trigger: '.story-section',
      start: 'top 75%'
    },
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out'
  });
  
  gsap.from('.story-text p', {
    scrollTrigger: {
      trigger: '.story-text',
      start: 'top 80%'
    },
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  });
  
  gsap.from('.story-highlight', {
    scrollTrigger: {
      trigger: '.story-highlight',
      start: 'top 80%'
    },
    scale: 0.95,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  gsap.from('.story-image', {
    scrollTrigger: {
      trigger: '.story-images',
      start: 'top 80%'
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
  });
  
  // Services
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  });
  
  // Timeline
  gsap.from('.timeline-item', {
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 75%'
    },
    x: -40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
  });
  
  // Collaborations
  gsap.from('.collab-card', {
    scrollTrigger: {
      trigger: '.collab-grid',
      start: 'top 80%'
    },
    scale: 0.9,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  });
  
  // Parallax on story images
  gsap.to('.story-image img', {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.story-images',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
}