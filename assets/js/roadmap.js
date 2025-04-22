/**
 * Roadmap.js - JavaScript for roadmap visualization and interactions
 * @ts-nocheck
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize progress bars with animation
  const initProgressBars = () => {
    const progressBars = document.querySelectorAll('.roadmap-project .h-full');
    
    if (progressBars.length > 0) {
      progressBars.forEach(bar => {
        // Store original width
        const originalWidth = bar.style.width;
        
        // Set width to 0 and add animation class
        bar.style.width = '0';
        bar.classList.add('progress-bar-animate');
        
        // Set the progress value as a CSS variable
        bar.style.setProperty('--progress-value', originalWidth);
        
        // Use Intersection Observer to trigger animation when visible
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Add loaded class to trigger animation
              setTimeout(() => {
                bar.classList.add('loaded');
              }, 300);
              
              // Unobserve after animation is triggered
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });
        
        observer.observe(bar);
      });
    }
  };
  
  // Highlight current milestone
  const highlightCurrentMilestone = () => {
    const milestones = document.querySelectorAll('.roadmap-project li');
    
    if (milestones.length > 0) {
      // Get current date
      const currentDate = new Date();
      
      milestones.forEach(milestone => {
        const dateText = milestone.querySelector('.text-dark-text-secondary')?.textContent;
        if (dateText) {
          const milestoneDate = new Date(dateText);
          
          // If milestone date is within 7 days of current date, highlight it
          const daysDifference = Math.abs(currentDate.getTime() - milestoneDate.getTime()) / (1000 * 60 * 60 * 24);
          
          if (daysDifference <= 7 && !milestone.querySelector('.text-dark-secondary')) {
            milestone.classList.add('milestone-active');
          }
        }
      });
    }
  };
  
  // Filter projects by status
  const setupProjectFilters = () => {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projects = document.querySelectorAll('.roadmap-project');
    
    if (filterButtons.length > 0 && projects.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Update active filter button
          filterButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          const filter = this.getAttribute('data-filter');
          
          projects.forEach(project => {
            if (filter === 'all') {
              project.style.display = 'block';
            } else {
              const projectStatus = project.getAttribute('data-status');
              if (projectStatus === filter) {
                project.style.display = 'block';
              } else {
                project.style.display = 'none';
              }
            }
          });
        });
      });
    }
  };
  
  // Initialize all roadmap functions
  initProgressBars();
  highlightCurrentMilestone();
  setupProjectFilters();
  
  // Re-run on window resize
  window.addEventListener('resize', function() {
    // Only re-run critical functions that depend on window size
  });
}); 