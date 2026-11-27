// Interactive features for Saicharan Draksharapu Portfolio (Jake Sinclair Aesthetic)

document.addEventListener('DOMContentLoaded', () => {
  // Live Clock (Jake Sinclair Header Clock element)
  const clockElement = document.getElementById('current-time');
  function updateTime() {
    if (!clockElement) return;
    try {
      const now = new Date();
      // Format time in Asia/Kolkata (Bengaluru)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeStr = now.toLocaleTimeString('en-US', options);
      clockElement.textContent = `BLR · ${timeStr}`;
    } catch (e) {
      clockElement.textContent = 'Bengaluru, IN';
    }
  }

  updateTime();
  setInterval(updateTime, 1000);

  // Smooth Active Nav Pill highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link:not(.nav-contact-btn)');

  function highlightNav() {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = 'var(--text-primary)';
            link.style.background = 'rgba(255, 255, 255, 0.08)';
          } else {
            link.style.color = '';
            link.style.background = '';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  // Contact Form Mailto Handler
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      const bodyText = `Hi Saicharan,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n— Sent from saicharan.dev portfolio`;
      const mailtoUrl = `mailto:dsaicharan072@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

      if (formStatus) {
        formStatus.textContent = 'Opening your email client...';
        formStatus.style.display = 'block';
        formStatus.style.color = 'var(--accent-warm)';
      }

      window.location.href = mailtoUrl;

      setTimeout(() => {
        if (formStatus) {
          formStatus.textContent = 'If your email app did not open, reach out directly at dsaicharan072@gmail.com';
          formStatus.style.color = '#10B981';
        }
      }, 2500);
    });
  }
});
