---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: BuildSix - A Developer's Journey
description: Building in public isn't just about sharing success stories—it's about documenting the entire journey, including the challenges, pivots, and breakthrough moments that shape each project.
---

<!-- Hero Section -->
<section class="pt-4 pb-12">
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
            href="/projects" 
            text="View My Projects" 
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

<!-- Development Timeline Section with full width -->
<section class="py-10 bg-dark-surface bg-opacity-30">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold mb-8 text-primary-500">Development Timeline</h2>

    {% assign current_projects = site.projects | where: "status", "in-progress" | sort: "position" %}
    {% if current_projects.size > 0 %}
      {% assign timeline_items = "" | split: "" %}
      
      {% for project in current_projects limit:1 %}
        {% for update in project.updates %}
          {% capture item %}
          {
            "date": "{{ update.date | date: '%b %d, %Y' }}",
            "title": "{{ update.title }}",
            "description": "{{ update.description }}",
            "status": "{{ update.status }}",
            "link": "{{ project.url }}#update-{{ forloop.index }}",
            "link_text": "View details"
          }
          {% endcapture %}
          
          {% assign timeline_items = timeline_items | push: item %}
        {% endfor %}
      {% endfor %}
      
      {% include components/timeline.html 
        title="Latest Project Updates" 
        items=timeline_items 
      %}
    {% else %}
      <div class="bg-dark-surface rounded-lg p-6 my-8">
        <p class="text-dark-text-secondary">No active projects with timeline updates. Check back soon!</p>
      </div>
    {% endif %}
  </div>
</section>

<!-- Latest Articles Section with improved grid -->
<section class="py-10">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl md:text-4xl font-bold text-primary-500">Latest Articles</h2>
      <a href="/blogs" class="text-primary-500 hover:text-primary-400 transition-colors">
        View all articles →
      </a>
    </div>

    {% assign latest_posts = site.posts | sort: "date" | reverse | limit: 3 %}

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {% for post in latest_posts %}
        <a href="{{ post.url }}" class="bg-dark-surface hover:bg-dark-surface-hover p-6 rounded-lg transition-colors h-full flex flex-col">
          <p class="text-dark-text-secondary text-sm mb-2">{{ post.date | date: "%b %d, %Y" }}</p>
          <h3 class="text-xl font-medium mb-3 text-white">{{ post.title }}</h3>
          <p class="text-dark-text-secondary line-clamp-3 flex-grow">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
          <div class="mt-4 text-primary-500">Read more →</div>
        </a>
      {% endfor %}
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
