---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: BuildSix - A Developer's Journey
description: Building in public isn't just about sharing success stories—it's about documenting the entire journey, including the challenges, pivots, and breakthrough moments that shape each project.
---

<!-- Hero Section - Hidden for WhatsApp validation -->
<section class="pt-4 pb-12" style="display: none;">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Left side content -->
      <div class="lg:col-span-7">
        <!-- Main title with blue gradient -->
        <h1 class="text-4xl md:text-7xl font-bold text-primary-500 mb-4 fade-in">{{ page.title }}</h1>
        
        <!-- Description with secondary text color -->
        <p class="text-xl text-dark-text-secondary mb-6 fade-in">
          {{ page.description }}
        </p>
        
        <!-- Main statement with specific text colors -->
        <div class="text-2xl md:text-4xl font-bold mb-10 mt-8 leading-tight">
          <!-- Orange title line -->
          <div class="mb-1 text-accent-500">
            Building and shipping in public:
          </div>
          
          <!-- Second line with "best" in green -->
          <div class="flex flex-wrap items-baseline">
            <span class="text-white mr-2">because the</span>
            <span class="text-secondary-500 mr-2">best</span>
            <span class="text-white">lessons come</span>
          </div>
          
          <!-- Third line with "real-world" in blue -->
          <div class="flex flex-wrap items-baseline">
            <span class="text-white mr-2">from</span>
            <span class="text-primary-500 mr-2">real-world</span>
            <span class="text-white">experience.</span>
          </div>
        </div>

        <!-- Call to action button using the button component -->
        <div class="fade-in mt-8">
          {% include components/link-button.html 
            href="/projects/wedding-invitation-saas" 
            text="View Detail" 
            icon_after=true 
          %}
        </div>
      </div>
      
      <!-- Right side content -->
      <div class="lg:col-span-5">
        <!-- Weekly insights paragraph with left border accent in a card -->
        <div class="bg-dark-surface rounded-lg p-6 border-l-4 border-primary-500 mt-4">
          <p class="text-lg md:text-xl text-dark-text-secondary">
            Each week, you'll get real-time insights into the development
            process and see how projects evolve from initial concept to final
            execution, including technical decisions, problem-solving
            approaches, and key learnings along the way. Whether you're a
            fellow builder, aspiring creator, or simply curious about SaaS
            development, these updates will provide practical insights you
            can apply to your own projects.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- WhatsApp Business Verification Section - Now visible as main hero -->
<section class="pt-4 pb-12">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Left side content -->
      <div class="lg:col-span-7">
        <!-- Main title with blue gradient -->
        <h1 class="text-4xl md:text-7xl font-bold text-primary-500 mb-4 fade-in">Undang Digital</h1>
        
        <!-- Description with secondary text color -->
        <p class="text-xl text-dark-text-secondary mb-6 fade-in">
          An innovative platform for creating elegant and interactive digital invitations with advanced customization features.
        </p>
        
        <!-- Main statement with specific text colors -->
        <div class="text-2xl md:text-4xl font-bold mb-10 mt-8 leading-tight">
          <!-- Main verification statement -->
          <div class="mb-1 text-accent-500">
            Undang Digital
          </div>
          
          <!-- Second line with "product" in green -->
          <div class="flex flex-wrap items-baseline">
            <span class="text-white mr-2">is a premium</span>
            <span class="text-secondary-500 mr-2">product</span>
            <span class="text-white">from</span>
          </div>
          
          <!-- Third line with "shopglobalsite" in blue -->
          <div class="flex flex-wrap items-baseline">
            <span class="text-primary-500 mr-2">shopglobalsite</span>
            <span class="text-white">platform.</span>
          </div>
        </div>

        <!-- Call to action button using the button component -->
        <div class="fade-in mt-8">
          {% include components/link-button.html 
            href="/projects/wedding-invitation-saas" 
            text="View Detail" 
            icon_after=true 
          %}
        </div>
      </div>
      
      <!-- Right side content -->
      <div class="lg:col-span-5">
        <!-- Product description paragraph with left border accent in a card -->
        <div class="bg-dark-surface rounded-lg p-6 border-l-4 border-primary-500 mt-4">
          <p class="text-lg md:text-xl text-dark-text-secondary">
            Undang Digital provides a comprehensive solution for creating 
            beautiful digital wedding invitations. Built with modern web 
            technologies, it offers seamless user experience, customizable 
            templates, and responsive design that works perfectly across 
            all devices. This platform represents the next generation of 
            digital invitation services.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Custom stylesheet to force specific colors if Tailwind classes don't work -->
<style>
  .text-primary-500 { color: #58A6FF !important; }
  .text-accent-500 { color: #F0883E !important; }
  .text-secondary-500 { color: #3FB950 !important; }
  .border-primary-500 { border-color: #58A6FF !important; }
  .bg-primary-500 { background-color: #58A6FF !important; }
  
  /* Button styles */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    background-color: #58A6FF;
    color: white !important;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
  }
  
  .btn-primary:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
  }
</style>
