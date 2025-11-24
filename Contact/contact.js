// ===================================
// CONTACT PAGE INTERACTIONS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  initContactAnimations();
  initFAQ();
});

// ===================================
// ANIMATIONS
// ===================================
function initContactAnimations() {
  if (!window.gsap) return;

  const ScrollTriggerPlugin = window.ScrollTrigger || (window.gsap && window.gsap.ScrollTrigger);
  if (!ScrollTriggerPlugin) return;

  gsap.registerPlugin(ScrollTriggerPlugin);
  
  // Hero entrance
  gsap.from('.contact-hero .section-label', {
    y: -30,
    //opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });
  
  gsap.from('.contact-hero h1', {
    y: 40,
    //opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out'
  });
  
  gsap.from('.hero-lead', {
    y: 20,
    //opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: 'power2.out'
  });
  
  // Contact cards
  gsap.from('.contact-card', {
    scrollTrigger: {
      trigger: '.contact-methods',
      start: 'top 75%'
    },
    y: 60,
    //opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
  });
  
  // Info cards
  gsap.from('.info-card', {
    scrollTrigger: {
      trigger: '.contact-info',
      start: 'top 80%'
    },
    y: 40,
    //opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out'
  });
  
  // FAQ items
  gsap.from('.faq-item', {
    scrollTrigger: {
      trigger: '.faq-list',
      start: 'top 80%'
    },
    x: -40,
    //opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  });
}

// ===================================
// FAQ ACCORDION
// ===================================
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    // FIXED: Add keyboard support (Enter/Space)
    const toggleFAQ = (e) => {
      if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
      if (e.type === 'keydown') e.preventDefault();
      
      const isActive = item.classList.contains('active');
      
      // Close all items
      faqItems.forEach(i => i.classList.remove('active'));
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    };
    
    question.addEventListener('click', toggleFAQ);
    question.addEventListener('keydown', toggleFAQ);
  });
}