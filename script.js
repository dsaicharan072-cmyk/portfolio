// Christoph Mandl (MANDL) Inspired Portfolio Interactions

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Bengaluru Clock
  const clockElement = document.getElementById('current-time');
  function updateTime() {
    if (!clockElement) return;
    try {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      clockElement.textContent = `BLR · ${timeStr} IST`;
    } catch {
      clockElement.textContent = 'BENGALURU, IN';
    }
  }
  updateTime();
  setInterval(updateTime, 1000);

  // 2. Active Section Highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.mandl-nav-link');

  function highlightNav() {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 160;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });

  // 3. Pixelated Image Reveal (Christoph Mandl signature interaction)
  const pixelFrames = document.querySelectorAll('[data-pixel-reveal]');
  pixelFrames.forEach((frame) => {
    const img = frame.querySelector('.pixel-target-img');
    const canvas = frame.querySelector('.pixel-canvas');
    if (!img || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function drawPixelated(blockSize) {
      if (!img.complete || img.naturalWidth === 0) return;
      const w = frame.clientWidth || 320;
      const h = frame.clientHeight || 360;
      const sw = Math.max(8, Math.floor(w / blockSize));
      const sh = Math.max(8, Math.floor(h / blockSize));
      canvas.width = sw;
      canvas.height = sh;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, sw, sh);
    }

    const init = () => drawPixelated(18);
    if (img.complete) init();
    else img.addEventListener('load', init);

    let animTimer = null;
    frame.addEventListener('mouseenter', () => {
      if (animTimer) clearInterval(animTimer);
      let step = 18;
      animTimer = setInterval(() => {
        step -= 4;
        if (step <= 2) {
          clearInterval(animTimer);
          frame.classList.add('is-resolved');
        } else {
          drawPixelated(step);
        }
      }, 45);
    });

    frame.addEventListener('mouseleave', () => {
      if (animTimer) clearInterval(animTimer);
      frame.classList.remove('is-resolved');
      drawPixelated(18);
    });

    // Auto-resolve briefly on mobile tap
    frame.addEventListener('click', () => {
      frame.classList.toggle('is-resolved');
    });
  });

  // 3b. Animated Pixelated Project Gallery Canvases (Christoph Mandl Gallery)
  const tiles = document.querySelectorAll('[data-pixel-tile]');
  tiles.forEach((tile, idx) => {
    const canvas = document.createElement('canvas');
    canvas.className = 'tile-art-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    tile.insertBefore(canvas, tile.firstChild);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = idx * 1.4;
    let isHovered = false;

    function renderFrame(pixelScale) {
      const cols = Math.max(12, Math.floor(140 / pixelScale));
      const rows = Math.max(12, Math.floor(130 / pixelScale));
      canvas.width = cols;
      canvas.height = rows;
      ctx.imageSmoothingEnabled = false;

      ctx.fillStyle = '#141412';
      ctx.fillRect(0, 0, cols, rows);

      // Draw kinetic pixel blocks in earthy olive + vivid red
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const wave = Math.sin(x * 0.45 + phase) * Math.cos(y * 0.45 - phase * 0.7);
          if (wave > 0.62) {
            ctx.fillStyle = '#ff1e00';
            ctx.fillRect(x, y, 1, 1);
          } else if (wave > 0.28) {
            ctx.fillStyle = '#9f9d89';
            ctx.fillRect(x, y, 1, 1);
          } else if (wave > 0.05) {
            ctx.fillStyle = '#47463c';
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }

    renderFrame(6);

    const row = tile.closest('.project-row');
    let rafId = null;
    function animate() {
      if (!isHovered) return;
      phase += 0.06;
      renderFrame(3);
      rafId = requestAnimationFrame(animate);
    }

    if (row) {
      row.addEventListener('mouseenter', () => {
        isHovered = true;
        animate();
      });
      row.addEventListener('mouseleave', () => {
        isHovered = false;
        if (rafId) cancelAnimationFrame(rafId);
        renderFrame(6);
      });
    }
  });

  // 4. Contact Form Mailto Handler
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
        formStatus.style.color = 'var(--red)';
      }

      window.location.href = mailtoUrl;

      setTimeout(() => {
        if (formStatus) {
          formStatus.textContent = 'If your email app did not open, reach out directly at dsaicharan072@gmail.com';
          formStatus.style.color = '#161614';
        }
      }, 2500);
    });
  }
});
