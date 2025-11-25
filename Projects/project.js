// ===================================
// PORTFOLIO PAGE ANIMATIONS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure DOM is fully loaded
  setTimeout(() => {
    initPortfolioAnimations();
  }, 100);
});

function initPortfolioAnimations() {
  if (!window.gsap || !window.ScrollTrigger) {
    console.log('GSAP not loaded, skipping animations');
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero entrance
  const heroLabel = document.querySelector('.portfolio-hero .section-label');
  if (heroLabel) {
    gsap.from(heroLabel, {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  }
  
  const heroH1 = document.querySelector('.portfolio-hero h1');
  if (heroH1) {
    gsap.from(heroH1, {
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out'
    });
  }
  
  const heroP = document.querySelector('.portfolio-hero p');
  if (heroP) {
    gsap.from(heroP, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      ease: 'power2.out'
    });
  }
  
  // Featured project (World Cup)
  const projectMedia = document.querySelector('.project-media');
  if (projectMedia) {
    gsap.from(projectMedia, {
      scrollTrigger: {
        trigger: '.featured-project',
        start: 'top 70%'
      },
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }
  
  const projectTag = document.querySelector('.project-tag');
  if (projectTag) {
    gsap.from(projectTag, {
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
  }
  
  const projectDetailsH2 = document.querySelector('.project-details h2');
  if (projectDetailsH2) {
    gsap.from(projectDetailsH2, {
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
  }
  
  const projectLead = document.querySelector('.project-lead');
  if (projectLead) {
    gsap.from(projectLead, {
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
  }
  
  const projectStats = document.querySelectorAll('.project-stats .stat');
  if (projectStats.length > 0) {
    gsap.from(projectStats, {
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
  }
  
  const descriptionPs = document.querySelectorAll('.project-description p');
  if (descriptionPs.length > 0) {
    gsap.from(descriptionPs, {
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
  }
  
  const projectLinkBtns = document.querySelectorAll('.project-links .btn');
  if (projectLinkBtns.length > 0) {
    gsap.from(projectLinkBtns, {
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
  }
  
  // FIXED: Project cards animation - NO OPACITY CHANGE
  const projectCards = document.querySelectorAll('.project-card');
  console.log('Found project cards:', projectCards.length); // Debug
  
  if (projectCards.length > 0) {
    gsap.from(projectCards, {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 90%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
        onEnter: () => console.log('Animation triggered!'),
        markers: false // Change to true to see trigger points
      },
      y: 40, // Reduced movement
      scale: 0.95, // Subtle scale instead of opacity
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      clearProps: 'all' // Clear properties after animation
    });
  }
  
  // Parallax on featured image
  const projectMediaImg = document.querySelector('.project-media img');
  if (projectMediaImg) {
    gsap.to(projectMediaImg, {
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
  
  // Force refresh ScrollTrigger
  ScrollTrigger.refresh();
}