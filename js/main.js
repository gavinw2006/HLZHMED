/* HLZHMED — Main Script */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky header shadow ── */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ── Mobile nav toggle ── */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  /* ── Active nav link ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === currentPath) a.classList.add('active');
  });

  /* ── Scroll-reveal (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll('.service-card, .value-card, .mission-card, .hero-card, .contact-detail, .service-detail');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('fade-in'), i * 60);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }

  /* ── Contact form ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const msg = document.getElementById('formSuccess');
      btn.disabled = true;
      btn.textContent = btn.dataset.sending || 'Sending…';
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = btn.dataset.submit || 'Send Message';
        form.reset();
        if (msg) { msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 5000); }
      }, 1200);
    });
  }

});
