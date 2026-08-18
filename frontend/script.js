// Footer year — keeps the copyright line current without a manual edit
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Highlight the nav link for the section currently in view
const navLinks = document.querySelectorAll('.nav-links a');
const trackedSections = document.querySelectorAll('#about, #skills, #work, #timeline');

if ('IntersectionObserver' in window && navLinks.length && trackedSections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  trackedSections.forEach((section) => observer.observe(section));
}
