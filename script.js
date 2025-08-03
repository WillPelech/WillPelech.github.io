// DOM elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

// Navbar scroll effect
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    navbar.style.height = 'var(--nav-scroll-height)';
    navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
  } else {
    navbar.style.height = 'var(--nav-height)';
    navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.85)';
  }
  
  lastScrollTop = scrollTop;
});

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
    }
  });
});

// Tab functionality for experience section
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
    }
    
    // Update the green indicator position
    const tabContainer = document.querySelector('.experience-tabs');
    const indicator = tabContainer.querySelector(':before') || tabContainer;
    
    if (window.innerWidth > 600) {
      // Desktop: vertical tabs
      const buttonHeight = button.offsetHeight;
      const buttonTop = button.offsetTop;
      tabContainer.style.setProperty('--indicator-top', `${buttonTop}px`);
    } else {
      // Mobile: horizontal tabs
      const buttonWidth = button.offsetWidth;
      const buttonLeft = button.offsetLeft;
      tabContainer.style.setProperty('--indicator-left', `${buttonLeft}px`);
    }
  });
});

// Intersection Observer for active nav links
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

// Animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.project, .about-content, .experience-content, .contact');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animate');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Set initial active tab
  const firstTabButton = document.querySelector('.tab-button');
  const firstTabPanel = document.querySelector('.tab-panel');
  
  if (firstTabButton && firstTabPanel) {
    firstTabButton.classList.add('active');
    firstTabPanel.classList.add('active');
  }
  
  // Initial animation check
  animateOnScroll();
});

// Preloader (optional)
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Handle resize for tab indicator
window.addEventListener('resize', () => {
  const activeTab = document.querySelector('.tab-button.active');
  if (activeTab) {
    activeTab.click(); // Trigger click to update indicator position
  }
});

// Add CSS custom properties for dynamic indicator positioning
const style = document.createElement('style');
style.textContent = `
  .experience-tabs:before {
    transform: translateY(var(--indicator-top, 0)) translateX(var(--indicator-left, 0));
  }
`;
document.head.appendChild(style);

// Email copy functionality (optional)
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // You can add email copy to clipboard functionality here if desired
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