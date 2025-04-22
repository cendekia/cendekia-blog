/**
 * Timeline.js - JavaScript for timeline visualization and animations
 * @ts-nocheck
 */
document.addEventListener('DOMContentLoaded', function() {
  // Animate timeline items on scroll
  const animateTimelineItems = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
      // Create an intersection observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add animated class when visible
            entry.target.classList.add('animated');
            
            // Unobserve after animation
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      // Observe each timeline item
      timelineItems.forEach(item => {
        observer.observe(item);
      });
    }
  };
  
  // Calculate timeline durations between consecutive items
  const calculateDurations = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 1) {
      for (let i = 0; i < timelineItems.length - 1; i++) {
        const currentTimeElement = timelineItems[i].querySelector('time');
        const nextTimeElement = timelineItems[i + 1].querySelector('time');
        
        if (currentTimeElement && nextTimeElement) {
          const currentDateStr = currentTimeElement.textContent;
          const nextDateStr = nextTimeElement.textContent;
          
          if (currentDateStr && nextDateStr) {
            const currentDate = new Date(currentDateStr);
            const nextDate = new Date(nextDateStr);
            
            if (!isNaN(currentDate.getTime()) && !isNaN(nextDate.getTime())) {
              // Calculate days between
              const daysDiff = Math.round((nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
              
              // Create and append duration element if more than 7 days between items
              if (daysDiff > 7) {
                const durationElement = document.createElement('div');
                durationElement.className = 'duration-indicator text-xs text-dark-text-secondary ml-6 -mt-7 mb-7';
                durationElement.textContent = `${daysDiff} days`;
                
                // Insert after the current timeline item
                timelineItems[i].after(durationElement);
              }
            }
          }
        }
      }
    }
  };
  
  // Initialize all timeline functions
  animateTimelineItems();
  calculateDurations();
  
  // Re-initialize on window resize (for responsive adjustments)
  window.addEventListener('resize', function() {
    // Recalculate anything that depends on window size
  });
}); 