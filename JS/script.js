// ==========================
// Fade-in on Scroll
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll('.fade-in');

  if (faders.length) {
    const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));
  }
});

// ==========================
// Skill Bar Animation
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const skillBars = document.querySelectorAll('.skills .bar div');

  if (skillBars.length) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillValue = entry.target.getAttribute('data-skill');
          entry.target.style.width = skillValue + '%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
      bar.style.width = "0"; // reset dulu
      skillObserver.observe(bar);
    });
  }
});

// ==========================
// Scroll Spy Navigation
// ==========================
document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// ==========================
// Typing Animation
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const typedText = document.querySelector('.typed-text');
  if (!typedText) return;

  const textArray = [
    "💻 Computer Science Student",
    "🚀 Software Engineer",
    "🤖 AI Enthusiast"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100; // kecepatan ketik
  let pauseEnd = 2000;   // jeda setelah selesai nulis
  let pauseStart = 500;  // jeda setelah kosong sebelum lanjut

  function type() {
    const currentText = textArray[textIndex];

    if (isDeleting) {
      typedText.textContent = currentText.substring(0, charIndex--);
      typingSpeed = 60; // lebih cepat hapus
    } else {
      typedText.textContent = currentText.substring(0, charIndex++);
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      // kalau udah selesai nulis → pause baru hapus
      isDeleting = true;
      setTimeout(type, pauseEnd);
      return;
    }

    if (isDeleting && charIndex < 0) {
      // kalau udah kosong → lanjut teks berikutnya
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(type, pauseStart);
      return;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 550);
});

// ==========================
// Dark Mode Toggle
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById('darkToggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleBtn.textContent = document.body.classList.contains('dark') ? "☀️" : "🌙";
  });
});
