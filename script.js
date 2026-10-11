/**
 * PORTOFOLIO DIGITAL - BACKEND DEVELOPER
 * File JavaScript Terpisah (script.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  }

  // 2. Header Background on Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Scrollspy: Active Navigation Link Indicator
  const sections = document.querySelectorAll('section[id]');
  
  const handleScrollSpy = () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScrollSpy);

  // 4. Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('btn-submit');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        showFeedback('Mohon isi semua kolom yang diperlukan.', 'error');
        return;
      }

      // Simulate sending state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
          </circle>
        </svg>
        Mengirim...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showFeedback(`Terima kasih, ${name}! Pesan Anda telah tercatat (mode simulasi). Anda juga dapat mengirim email langsung ke kontak yang tertera.`, 'success');
        contactForm.reset();

        // Clear feedback after 7 seconds
        setTimeout(() => {
          formFeedback.classList.add('hidden');
        }, 7000);
      }, 900);
    });
  }

  function showFeedback(text, type) {
    formFeedback.textContent = text;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.classList.remove('hidden');
  }

  // 5. Console Greeting for Tech Recruiters / Developers
  console.log(
    '%c[Backend Developer Portfolio]%c \nSelamat datang di website portofolio! \nTech Stack: PHP, Python, REST API, MySQL, PostgreSQL, Git.',
    'color: #38bdf8; font-weight: bold; font-size: 14px;',
    'color: #94a3b8; font-size: 12px;'
  );
});
