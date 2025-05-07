// Particle animation for header
document.addEventListener('DOMContentLoaded', () => {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 5 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    particlesContainer.appendChild(particle);
  }
  
  // Cursor follower
  const cursorFollower = document.querySelector('.cursor-follower');
  document.addEventListener('mousemove', (e) => {
    cursorFollower.style.left = `${e.clientX}px`;
    cursorFollower.style.top = `${e.clientY}px`;
  });
  
  // Interactive elements effect
  const interactiveElements = document.querySelectorAll('.category-card, .feature-card, .testimonial-card, .social-link, .nav-link, .cta-button');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
      cursorFollower.style.background = 'rgba(0, 212, 255, 0.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.background = 'rgba(0, 212, 255, 0.3)';
    });
  });
  
  // Back to top button
  const fab = document.querySelector('.fab');
  fab.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-container');
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(10, 10, 26, 0.95)';
      nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    } else {
      nav.style.background = 'rgba(10, 10, 26, 0.8)';
      nav.style.boxShadow = 'none';
    }
  });
  
  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Typewriter effect for terminal
  const terminalCode = document.querySelector('.code-terminal .code-line:last-child');
  const commands = [
    'npm start',
    'node cyber-learning.js',
    'git commit -m "Hacked the future"',
    'console.log("Hello, 2077!")'
  ];
  
  let currentCommand = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeCommand() {
    const currentText = commands[currentCommand];
    
    if (isDeleting) {
      terminalCode.textContent = currentText.substring(0, charIndex - 1) + '_';
      charIndex--;
    } else {
      terminalCode.textContent = currentText.substring(0, charIndex + 1) + '_';
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeCommand, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentCommand = (currentCommand + 1) % commands.length;
      setTimeout(typeCommand, 500);
    } else {
      const typingSpeed = isDeleting ? 100 : 150;
      setTimeout(typeCommand, typingSpeed);
    }
  }
  
  // Start typing effect after a delay
  setTimeout(typeCommand, 3000);
});