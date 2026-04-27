// ============================================================
// MAIN JS — all client-side behavior
// ============================================================
// Sections:
//   1. Typing animation  (hero section)
//   2. Theme toggle       (dark / light)
//   3. Mobile menu        (hamburger)
//   4. Scroll reveal      (fade in on scroll)
//   5. Active nav link    (highlight current section)
// ============================================================

// ---- 1. Typing animation ----
// Cycles through the name: types it, pauses, deletes, repeats.
// To change the displayed name, edit `textToType`.
// Adjust `typeSpeed` / `deleteSpeed` / `pauseBeforeDelete` / `pauseBeforeRepeat` for timing.
(function initTyping() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  
  const textToType    = 'Mahammad Mirzazada';  // ← change your name here
  const typeSpeed     = 200;   // ms per character when typing
  const deleteSpeed   = 100;   // ms per character when deleting
  const pauseDone     = 2000;  // ms to wait after fully typed
  const pauseEmpty    = 500;   // ms to wait after fully deleted

  let charIndex  = 0;
  let isDeleting = false;

  function tick() {
    if (!isDeleting) {
      // --- currently typing forward ---
      if (charIndex < textToType.length) {
        typingElement.textContent = textToType.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(tick, typeSpeed);
      } else {
        isDeleting = true;
        setTimeout(tick, pauseDone);
      }
    } else {
      // --- currently deleting backward ---
      if (charIndex > 0) {
        typingElement.textContent = textToType.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(tick, deleteSpeed);
      } else {
        isDeleting = false;
        setTimeout(tick, pauseEmpty);
      }
    }
  }

  // Brief delay before the first character appears
  setTimeout(tick, 800);
})();


// ---- 2. Theme toggle ----
// Swaps .dark on <html> and shows the correct sun / moon icon.
(function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon     = document.getElementById('sunIcon');
  const moonIcon    = document.getElementById('moonIcon');
  const html        = document.documentElement;
  if (!themeToggle || !sunIcon || !moonIcon) return;

  function updateIcons() {
    // Sun icon = click to switch to light (shown in dark mode)
    // Moon icon = click to switch to dark (shown in light mode)
    sunIcon.classList.toggle('hidden',  !html.classList.contains('dark'));
    moonIcon.classList.toggle('hidden',  html.classList.contains('dark'));
  }

  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    updateIcons();
  });

  updateIcons();
})();


// ---- 3. Mobile menu ----
// Toggles the hamburger menu open / closed on small screens.
(function initMobileMenu() {
  const menuBtn     = document.getElementById('mobileMenuBtn');
  const mobileMenu  = document.getElementById('mobileMenu');
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close the menu whenever a link inside it is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });
})();


// ---- 4. Scroll reveal ----
// Adds the .active class to .reveal elements when they enter the viewport.
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const offset  = 100;  // px above the bottom of the viewport to trigger

  function onScroll() {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - offset) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll);
  window.addEventListener('load', onScroll);  // reveal elements already in view
})();


// ---- 5. Active nav link highlighting ----
// Highlights the nav link that corresponds to the section currently in view.
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const offset = 100;  // px below the top of the viewport to count as "in section"

  function onScroll() {
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - offset;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('dark:text-primary-400', 'text-primary-600');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('dark:text-primary-400', 'text-primary-600');
      }
    });
  }

  window.addEventListener('scroll', onScroll);
})();
