/**
 * Components JavaScript
 * For interactive UI components
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden');
    });
  }
  
  // Collapsible sections
  const collapsibles = document.querySelectorAll('.collapsible-trigger');
  
  if (collapsibles.length > 0) {
    collapsibles.forEach(trigger => {
      trigger.addEventListener('click', function() {
        const target = document.getElementById(this.getAttribute('data-target'));
        
        if (target) {
          const isExpanded = target.classList.contains('expanded');
          
          // Update aria attributes
          this.setAttribute('aria-expanded', !isExpanded);
          
          // Toggle expanded class
          target.classList.toggle('expanded');
          
          // Toggle icon
          const icon = this.querySelector('.collapsible-icon');
          if (icon) {
            icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
          }
        }
      });
    });
  }
  
  // Timeline animation on scroll
  const animateTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
      timelineItems.forEach((item, index) => {
        // Add a staggered animation delay
        const delay = index * 150;
        
        // Check if element is in viewport
        const rect = item.getBoundingClientRect();
        const isInViewport = 
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth);
        
        if (isInViewport) {
          setTimeout(() => {
            item.classList.add('animated');
          }, delay);
        }
      });
    }
  };
  
  // Run on load and scroll
  animateTimeline();
  window.addEventListener('scroll', animateTimeline);
}); 