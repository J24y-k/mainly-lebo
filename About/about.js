// small GSAP reveal for about page
document.addEventListener('DOMContentLoaded', () => {
  if (window.gsap) {
    gsap.from('h1',{y:24,opacity:0,duration:.8});
    gsap.from('.bio p',{y:12,opacity:0,duration:.7,stagger:.15,delay:.2});
  }
});
