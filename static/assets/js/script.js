document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");
  
  // Animate skill bars when resume section becomes visible
  const skillBars = document.querySelectorAll('.skill-progress');
  
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to handle scroll events
  function handleScroll() {
    skillBars.forEach(bar => {
      if (isInViewport(bar)) {
        bar.style.width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
      }
    });
  }
  
  // Initial check on page load
  handleScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Navigation functionality
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("data-target");
      
      navLinks.forEach(nav => nav.classList.remove("active"));
      link.classList.add("active");
      
      pages.forEach(page => {
        if (page.getAttribute("data-page") === target) {
          page.classList.add("active");
          // Trigger skill bar animation if on resume page
          if (target === 'resume') {
            setTimeout(handleScroll, 600); // Wait for animation to complete
          }
        } else {
          page.classList.remove("active");
        }
      });
    });
  });
  
  // Form submission handling
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Here you would typically send the form data to a server
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }
});