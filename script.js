// DOM elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

// Project scroll functionality
let currentProjectIndex = 0;
const projects = document.querySelectorAll('.project.small');
const projectsGrid = document.getElementById('projectsGrid');
const scrollDots = document.querySelectorAll('.scroll-dot');
const projectsContainer = document.querySelector('.projects-scroll-container');

// Project navigation functions
function scrollProjects(direction) {
  if (direction === 'left') {
    currentProjectIndex = Math.max(0, currentProjectIndex - 1);
  } else {
    currentProjectIndex = Math.min(projects.length - 1, currentProjectIndex + 1);
  }
  updateProjectDisplay();
}

function scrollToProject(index) {
  currentProjectIndex = Math.max(0, Math.min(projects.length - 1, index));
  updateProjectDisplay();
}

function updateProjectDisplay() {
  // Update project positions for desktop
  if (window.innerWidth > 768) {
    const offset = currentProjectIndex * -410; // 380px width + 30px gap
    projectsGrid.style.transform = `translate(calc(-50% + ${offset}px), -50%)`;
  }
  
  // Update active states
  projects.forEach((project, index) => {
    project.classList.toggle('active', index === currentProjectIndex);
  });
  
  // Update scroll dots
  scrollDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentProjectIndex);
  });
}

function openProject(url) {
  if (url && url !== '#') {
    window.open(url, '_blank');
  }
}

// Mouse wheel scroll for projects section
function handleProjectScroll(event) {
  if (!projectsContainer) return;
  
  const rect = projectsContainer.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight && rect.bottom > 0;
  
  if (isInView && window.innerWidth > 768) {
    event.preventDefault();
    
    if (event.deltaY > 0) {
      // Scroll down - next project
      scrollProjects('right');
    } else {
      // Scroll up - previous project
      scrollProjects('left');
    }
  }
}

// Keyboard navigation for projects
function handleProjectKeyboard(event) {
  if (!projectsContainer) return;
  
  const rect = projectsContainer.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight && rect.bottom > 0;
  
  if (isInView) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollProjects('left');
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollProjects('right');
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const activeProject = projects[currentProjectIndex];
      if (activeProject) {
        activeProject.click();
      }
    }
  }
}

// Loading animation on page load
document.addEventListener('DOMContentLoaded', () => {
  // Add loading class to trigger animations
  const loadingElements = document.querySelectorAll('.loading');
  loadingElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(60px)';
    
    setTimeout(() => {
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 100 + 200);
  });

  // Set initial active tab
  const firstTabButton = document.querySelector('.tab-button');
  const firstTabPanel = document.querySelector('.tab-panel');
  
  if (firstTabButton && firstTabPanel) {
    firstTabButton.classList.add('active');
    firstTabPanel.classList.add('active');
  }

  // Initial animation check
  animateOnScroll();
  
  // Initialize project navigation
  if (projectsContainer) {
    updateProjectDisplay();
    
    // Add wheel event listener for project scrolling
    projectsContainer.addEventListener('wheel', handleProjectScroll, { passive: false });
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleProjectKeyboard);
    
    // Add touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    projectsContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    projectsContainer.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          scrollProjects('right');
        } else {
          scrollProjects('left');
        }
      }
    });
  }
  
  // Add initial classes for smooth transitions
  document.body.classList.add('loaded');
});

// Navbar scroll effect with improved performance
let lastScrollTop = 0;
let ticking = false;

function updateNavbar() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop;
  ticking = false;
}

function requestNavbarUpdate() {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}

window.addEventListener('scroll', requestNavbarUpdate);

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Update active nav link
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// Enhanced tab functionality for experience section
tabButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and panels
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Add active class to clicked button and corresponding panel
    button.classList.add('active');
    const targetTab = button.getAttribute('data-tab');
    const targetPanel = document.getElementById(targetTab);
    
    if (targetPanel) {
      targetPanel.classList.add('active');
      
      // Add animation to panel content
      targetPanel.style.opacity = '0';
      targetPanel.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        targetPanel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        targetPanel.style.opacity = '1';
        targetPanel.style.transform = 'translateY(0)';
      }, 10);
    }
    
    // Update the green indicator position
    const tabContainer = document.querySelector('.experience-tabs');
    
    if (window.innerWidth > 600) {
      // Desktop: vertical tabs
      const buttonTop = button.offsetTop;
      tabContainer.style.setProperty('--indicator-top', `${buttonTop}px`);
    } else {
      // Mobile: horizontal tabs
      const buttonLeft = button.offsetLeft;
      tabContainer.style.setProperty('--indicator-left', `${buttonLeft}px`);
    }
  });
});

// Intersection Observer for active nav links with improved performance
const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.getAttribute('id');
      
      // Remove active class from all nav links
      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
  observer.observe(section);
});

// Enhanced animation on scroll with throttling
let animationTicking = false;

const animateOnScroll = () => {
  const elements = document.querySelectorAll('.project, .about-content, .experience-content, .contact');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animate');
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
  
  animationTicking = false;
};

function requestAnimationUpdate() {
  if (!animationTicking) {
    requestAnimationFrame(animateOnScroll);
    animationTicking = true;
  }
}

window.addEventListener('scroll', requestAnimationUpdate);

// Enhanced project hover effects
const projectCards = document.querySelectorAll('.project.small .project-inner');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-7px)';
    card.style.transition = 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Enhanced project image placeholder hover effects
const projectPlaceholders = document.querySelectorAll('.project-image-placeholder');
projectPlaceholders.forEach(placeholder => {
  placeholder.addEventListener('mouseenter', () => {
    placeholder.style.transform = 'translateY(-5px)';
    placeholder.style.borderColor = 'var(--green)';
  });
  
  placeholder.addEventListener('mouseleave', () => {
    placeholder.style.transform = 'translateY(0)';
    placeholder.style.borderColor = 'var(--lightest-navy)';
  });
});

// Handle resize for tab indicator
window.addEventListener('resize', () => {
  if (projectsContainer) {
    updateProjectDisplay();
  }
  
  const activeTab = document.querySelector('.tab-button.active');
  if (activeTab) {
    activeTab.click(); // Trigger click to update indicator position
  }
});

// Auto-scroll projects (optional - can be enabled/disabled)
let autoScrollEnabled = false;
let autoScrollInterval;

function startAutoScroll() {
  if (autoScrollEnabled && window.innerWidth > 768) {
    autoScrollInterval = setInterval(() => {
      currentProjectIndex = (currentProjectIndex + 1) % projects.length;
      updateProjectDisplay();
    }, 4000); // Change project every 4 seconds
  }
}

function stopAutoScroll() {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
  }
}

// Enable auto-scroll when not interacting
if (projectsContainer) {
  projectsContainer.addEventListener('mouseenter', stopAutoScroll);
  projectsContainer.addEventListener('mouseleave', startAutoScroll);
  
  // Start auto-scroll initially (optional)
  // startAutoScroll();
}

// Add CSS custom properties for dynamic indicator positioning
const style = document.createElement('style');
style.textContent = `
  .experience-tabs:before {
    transform: translateY(var(--indicator-top, 0)) translateX(var(--indicator-left, 0));
  }
`;
document.head.appendChild(style);

// Enhanced email functionality
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Optional: Add analytics tracking or other functionality here
    console.log('Email link clicked:', link.href);
  });
});

// Scroll to top functionality
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Add scroll to top on logo click
const logo = document.querySelector('.nav-logo a');
if (logo) {
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToTop();
  });
}

// Add hover effects for navigation links
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.color = 'var(--green)';
  });
  
  link.addEventListener('mouseleave', () => {
    if (!link.classList.contains('active')) {
      link.style.color = 'var(--lightest-slate)';
    }
  });
});

// Enhanced social links hover effects
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.color = 'var(--green)';
    link.style.transform = 'translateY(-3px)';
  });
  
  link.addEventListener('mouseleave', () => {
    link.style.color = 'var(--light-slate)';
    link.style.transform = 'translateY(0)';
  });
});

// Add typing effect for hero section (optional enhancement)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Preloader enhancement
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Optional: Add a subtle entrance animation for the entire page
  const mainContent = document.getElementById('content');
  if (mainContent) {
    mainContent.style.opacity = '1';
    mainContent.style.transform = 'translateY(0)';
  }
});

// Add focus management for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('using-keyboard');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('using-keyboard');
});

// Initialize counter for section numbering
let sectionCounter = 0;
const numberedSections = document.querySelectorAll('.section-title');
numberedSections.forEach(section => {
  sectionCounter++;
});

// Enhanced performance monitoring (optional)
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page load time: ${pageLoadTime}ms`);
    }, 0);
  });
} 