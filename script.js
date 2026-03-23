/* =====================================================
   script.js — Shivansh Dubey Portfolio (Overhauled)
   ===================================================== */

// ── Custom Cursor ─────────────────────────────────────
const cursor = document.getElementById('cursor');

if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursor.classList.add('active');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  document.addEventListener('mouseleave', () => cursor.classList.remove('active'));

  document.querySelectorAll('a, button, .project-card, .note-card, .about-stack span').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ── Navbar: scrolled class ────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile nav toggle ─────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ── Scroll reveal (Intersection Observer) ─────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

// Stagger siblings within the same parent grid/list
const staggerParents = ['.projects-grid', '.notes-grid', '.journey-list', '.about-left', '.about-right'];

staggerParents.forEach(selector => {
  const parent = document.querySelector(selector);
  if (!parent) return;
  const children = parent.querySelectorAll('.reveal');
  children.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
  });
});

revealEls.forEach(el => revealObserver.observe(el));

// ── Active nav link highlighting ──────────────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
  });
}, { passive: true });

// ── Smooth scroll for anchor links ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Hero Background Map: Scroll Parallax ────────────────
const heroMap = document.querySelector('.hero-bg-map');

if (heroMap && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  let tick = false;

  const updateMapScroll = () => {
    const scrollY = window.scrollY;
    // Animate over the first 500px of scroll
    const scrollRange = 500; 
    const progress = Math.max(0, Math.min(scrollY / scrollRange, 1));

    // Opacity: 0.2 -> 0.5
    const opacity = (0.2 + (progress * 0.3)).toFixed(3);

    
    // Scale: 1 -> 1.05
    const scale = (1 + (progress * 0.05)).toFixed(3);
    
    // Parallax: Move slightly slower (e.g. 30% of scroll)
    const y = (scrollY * 0.25).toFixed(1);

    heroMap.style.opacity   = opacity;
    heroMap.style.transform = `scale(${scale}) translateY(${y}px)`;

    tick = false;
  };

  window.addEventListener('scroll', () => {
    if (!tick) {
      requestAnimationFrame(updateMapScroll);
      tick = true;
    }
  }, { passive: true });

  // Initial call to set state
  updateMapScroll();
}





