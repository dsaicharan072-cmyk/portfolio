// Interactive features & typing animation

document.addEventListener('DOMContentLoaded', () => {
  // Typing Effect
  const phrases = [
    'Full-Stack Developer',
    'Open-Source Contributor (Rocket.Chat)',
    'AI/ML Systems Enthusiast',
    'Competitive Programmer (366+ Solved)',
    'Distributed Systems Builder'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typing-text');
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const delayBetweenPhrases = 1800;

  function typeEffect() {
    if (!typingElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, delayBetweenPhrases);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeEffect, 400);
      return;
    }

    const nextTimeout = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeEffect, nextTimeout);
  }

  typeEffect();

  // Mobile navigation toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        if (mobileMenu.classList.contains('hidden')) {
          icon.className = 'fa-solid fa-bars text-xl';
        } else {
          icon.className = 'fa-solid fa-xmark text-xl';
        }
      }
    });

    // Close menu when clicking links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = menuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars text-xl';
      });
    });
  }

  // Navbar glass opacity on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('shadow-xl', 'bg-dark/90');
    } else {
      navbar.classList.remove('shadow-xl', 'bg-dark/90');
    }
  });

  // Contact Form Handling (mailto generator)
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      const bodyText = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const mailtoUrl = `mailto:dsaicharan072@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

      if (formStatus) {
        formStatus.textContent = 'Opening your email client...';
        formStatus.className = 'text-xs text-center font-mono text-emerald-400 mt-2 block';
      }

      window.location.href = mailtoUrl;

      setTimeout(() => {
        if (formStatus) {
          formStatus.textContent = 'If your mail client did not open, email directly: dsaicharan072@gmail.com';
          formStatus.className = 'text-xs text-center font-mono text-amber-400 mt-2 block';
        }
      }, 2500);
    });
  }
});
