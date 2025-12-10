(function () {
  'use strict';

  // Theme Toggle
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  root.setAttribute('data-theme', savedTheme);
  if (themeBtn) {
    themeBtn.textContent = savedTheme === 'dark' ? 'Tryb jasny' : 'Tryb ciemny';
    
    themeBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeBtn.textContent = newTheme === 'dark' ? 'Tryb jasny' : 'Tryb ciemny';
    });
  }

  // Particle Background
  function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
      particlesContainer.appendChild(particle);
    }
  }

  // Reading Progress Bar
  const progressBar = document.getElementById('progressBar');
  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = progress + '%';
    }
  }

  // Animated Counter
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      if (element.dataset.format === 'percentage') {
        element.textContent = Math.floor(current) + '%';
      } else if (element.dataset.format === 'multiplier') {
        element.textContent = current.toFixed(1) + 'x';
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animate counters when visible
        if (entry.target.classList.contains('kpi') && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          const text = entry.target.textContent;
          const match = text.match(/(\d+)/);
          if (match) {
            const target = parseInt(match[1]);
            animateCounter(entry.target, target);
          }
        }
      }
    });
  }, observerOptions);

  // Expandable Cards
  function initExpandableCards() {
    const expandableCards = document.querySelectorAll('.card.expandable');
    expandableCards.forEach(card => {
      const header = card.querySelector('.card-header');
      if (header) {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
          card.classList.toggle('expanded');
        });
      }
    });
  }

  // Quiz Functionality
  function initQuizzes() {
    const quizSections = document.querySelectorAll('.quiz-section');
    
    quizSections.forEach(section => {
      const options = section.querySelectorAll('.quiz-option');
      const feedbackDiv = section.querySelector('.quiz-feedback');
      let answered = false;

      options.forEach(option => {
        option.addEventListener('click', () => {
          if (answered) return;
          answered = true;

          const isCorrect = option.dataset.correct === 'true';
          
          options.forEach(opt => {
            opt.style.pointerEvents = 'none';
            if (opt.dataset.correct === 'true') {
              opt.classList.add('correct');
            }
          });

          if (isCorrect) {
            option.classList.add('correct');
            if (feedbackDiv) {
              feedbackDiv.textContent = '✓ Świetnie! Poprawna odpowiedź!';
              feedbackDiv.className = 'quiz-feedback correct';
              feedbackDiv.style.display = 'block';
            }
          } else {
            option.classList.add('incorrect');
            if (feedbackDiv) {
              feedbackDiv.textContent = '✗ Niepoprawnie. Spróbuj ponownie!';
              feedbackDiv.className = 'quiz-feedback incorrect';
              feedbackDiv.style.display = 'block';
            }
            
            setTimeout(() => {
              answered = false;
              options.forEach(opt => {
                opt.style.pointerEvents = 'auto';
                opt.classList.remove('incorrect');
              });
              if (feedbackDiv) {
                feedbackDiv.style.display = 'none';
              }
            }, 2000);
          }
        });
      });
    });
  }

  // Active Navigation Link
  function setActiveNavLink() {
    const currentPath = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Smooth Scroll for Anchor Links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Interactive Chart Animation
  function animateCharts() {
    const charts = document.querySelectorAll('.chart-bar');
    charts.forEach(bar => {
      const width = bar.dataset.width || '0%';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }

  // Initialize Everything
  function init() {
    createParticles();
    updateProgress();
    setActiveNavLink();
    initExpandableCards();
    initQuizzes();
    initSmoothScroll();
    animateCharts();

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in, .card, .kpi').forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });

    // Update progress on scroll
    window.addEventListener('scroll', updateProgress, { passive: true });

    // Add hover effect to cards
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose some functions globally for inline use
  window.MotywacjaApp = {
    animateCounter,
    observer
  };

})();
