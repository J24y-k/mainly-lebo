// ===================================
// MAINLY LEBO - ENHANCED JAVASCRIPT
// Professional interactions & animations
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initMobileMenu();
  initScrollHeader();
  initHeroCarousel();
  initCounters();
  initSmoothScroll();
  initFadeIns(); // FIXED: Moved fade-in observer inside DOMContentLoaded
  
  // Wait for GSAP to load before initializing animations
  if (window.gsap && window.ScrollTrigger) {
    initAnimations();
  }
});

// ===================================
// FOOTER YEAR
// ===================================
function initYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// ===================================
// MOBILE MENU
// ===================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!hamburger || !mobileMenu) return;
  
  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isExpanded));
    mobileMenu.hidden = isExpanded;
    
    // FIXED: Better scroll lock for iOS/mobile
    document.body.style.overflow = isExpanded ? '' : 'hidden';
    document.body.style.position = isExpanded ? '' : 'fixed';
    document.body.style.width = isExpanded ? '' : '100%';
  });
  
  // Close menu when clicking links
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    });
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.hidden) {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  });
}

// ===================================
// SCROLL HEADER
// ===================================
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// ===================================
// HERO CAROUSEL
// ===================================
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  let isPaused = false;
  let interval; // FIXED: Make interval accessible for clear
  
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    if (slides[index]) {
      slides[index].classList.add('active');
    }
    // FIXED: Re-apply parallax to new active slide
    if (window.gsap && slides[index]) {
      gsap.killTweensOf('.hero-slide img'); // Kill old
      gsap.to(slides[index].querySelector('img'), {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }
  
  function nextSlide() {
    if (isPaused) return;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  // Auto-advance every 5 seconds
  interval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', () => {
      isPaused = true;
    });
    
    hero.addEventListener('mouseleave', () => {
      isPaused = false;
    });
  }
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(interval);
  });
}

// ===================================
// ANIMATED COUNTERS
// ===================================
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (counters.length === 0) return;
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString() + '+';
      }
    };
    
    updateCounter();
  };
  
  // Trigger when in viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      const header = document.querySelector('.site-header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// ===================================
// FIXED: FADE-IN OBSERVER (Moved Inside)
// ===================================
function initFadeIns() {
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  }
}

// ===================================
// GSAP ANIMATIONS
// ===================================
function initAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero entrance animations
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) {
    gsap.from(heroBadge, {
      y: -50,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out'
    });
  }
  
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    gsap.from(heroTitle, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      delay: 0.4,
      ease: 'power3.out'
    });
  }
  
  const heroTagline = document.querySelector('.hero-tagline');
  if (heroTagline) {
    gsap.from(heroTagline, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: 'power3.out'
    });
  }
  
  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) {
    gsap.from(heroSub, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.8,
      ease: 'power3.out'
    });
  }
  
  const heroCtaBtns = document.querySelectorAll('.hero-cta .btn');
  if (heroCtaBtns.length > 0) {
    gsap.from(heroCtaBtns, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 1,
      ease: 'back.out(1.7)'
    });
  }
  
  const heroScroll = document.querySelector('.hero-scroll');
  if (heroScroll) {
    gsap.from(heroScroll, {
      opacity: 0,
      duration: 1,
      delay: 1.5,
      ease: 'power2.out'
    });
  }
  
  // Stats items
  const statItems = document.querySelectorAll('.stat-item');
  if (statItems.length > 0) {
    gsap.from(statItems, {
      scrollTrigger: {
        trigger: '.stats',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out'
    });
  }
  
  // About section animations
  const aboutLabel = document.querySelector('.about-preview .section-label');
  if (aboutLabel) {
    gsap.from(aboutLabel, {
      scrollTrigger: {
        trigger: '.about-preview',
        start: 'top 75%'
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  }
  
  const aboutH2 = document.querySelector('.about-text h2');
  if (aboutH2) {
    gsap.from(aboutH2, {
      scrollTrigger: {
        trigger: '.about-preview',
        start: 'top 75%'
      },
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out'
    });
  }
  
  const aboutP = document.querySelector('.about-text p');
  if (aboutP) {
    gsap.from(aboutP, {
      scrollTrigger: {
        trigger: '.about-preview',
        start: 'top 75%'
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      ease: 'power2.out'
    });
  }
  
  const highlights = document.querySelectorAll('.highlight');
  if (highlights.length > 0) {
    gsap.from(highlights, {
      scrollTrigger: {
        trigger: '.about-highlights',
        start: 'top 85%'
      },
      x: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    });
  }
  
  const aboutImageWrapper = document.querySelector('.about-image-wrapper');
  if (aboutImageWrapper) {
    gsap.from(aboutImageWrapper, {
      scrollTrigger: {
        trigger: '.about-visual',
        start: 'top 75%'
      },
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }
  
  // Featured cards
  const featuredCards = document.querySelectorAll('.featured-card');
  if (featuredCards.length > 0) {
    gsap.from(featuredCards, {
      scrollTrigger: {
        trigger: '.featured-grid',
        start: 'top 80%'
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }
  
  // CTA section
  const ctaH2 = document.querySelector('.cta-content h2');
  if (ctaH2) {
    gsap.from(ctaH2, {
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 75%'
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }
  
  const ctaP = document.querySelector('.cta-content p');
  if (ctaP) {
    gsap.from(ctaP, {
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 75%'
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out'
    });
  }
  
  const ctaBtns = document.querySelectorAll('.cta-buttons .btn');
  if (ctaBtns.length > 0) {
    gsap.from(ctaBtns, {
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 75%'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      delay: 0.4,
      ease: 'back.out(1.7)'
    });
  }
}