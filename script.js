/*
  script.js
  Purpose: lightweight UI interactions for the portfolio.
  - smooth scrolling
  - mobile navigation toggle
  - header shadow + back-to-top visibility
  - typing animation
  - reveal-on-scroll using IntersectionObserver
*/

const siteHeader = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.nav-links a');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const revealItems = document.querySelectorAll('.reveal');
const typingTarget = document.getElementById('typing-text');

// Phrases used by the typing animation (looped)
const phrases = ['IT Developer', 'Cybersecurity Enthusiast', 'QA Enthusiast'];

// Toggle header scrolled state and back-to-top visibility
function toggleHeaderState() {
  if (window.scrollY > 8) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }

  if (window.scrollY > 480) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

// Attach smooth scrolling to internal nav links
function setupSmoothScrolling() {
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId.startsWith('#')) {
        return;
      }

      const targetSection = document.querySelector(targetId);
      if (!targetSection) {
        return;
      }

      event.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.innerWidth <= 720) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Setup mobile nav toggle behavior
function setupMobileNavigation() {
  if (!menuToggle || !navMenu) {
    return;
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Use IntersectionObserver to reveal elements on scroll
function setupRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

// Observe which section is on screen and update nav active state
function setupSectionObserver() {
  const sections = document.querySelectorAll('main section[id]');
  const options = { threshold: 0.45 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const link = document.querySelector('.nav-links a[href="#' + id + '"]');
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach((a) => a.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, options);

  sections.forEach((s) => observer.observe(s));
}

// Typing animation: types a phrase then deletes it
function typeLoop(index = 0) {
  if (!typingTarget) {
    return;
  }

  const phrase = phrases[index];
  let charIndex = 0;
  typingTarget.textContent = '';

  const typeInterval = window.setInterval(() => {
    typingTarget.textContent += phrase.charAt(charIndex);
    charIndex += 1;

    if (charIndex > phrase.length) {
      window.clearInterval(typeInterval);
      window.setTimeout(() => {
        deleteLoop(index, phrase);
      }, 1100);
    }
  }, 85);
}

// Helper to delete the currently typed phrase
function deleteLoop(index, phrase) {
  let charIndex = phrase.length;
  const deleteInterval = window.setInterval(() => {
    typingTarget.textContent = phrase.substring(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex <= 0) {
      window.clearInterval(deleteInterval);
      const nextIndex = (index + 1) % phrases.length;
      window.setTimeout(() => typeLoop(nextIndex), 300);
    }
  }, 60);
}

// Initialize all interactions on DOM ready
function init() {
  toggleHeaderState();
  setupSmoothScrolling();
  setupMobileNavigation();
  setupRevealAnimations();
  setupSectionObserver();
  typeLoop();
  window.addEventListener('scroll', toggleHeaderState, { passive: true });

  // Back to top behavior
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

init();
