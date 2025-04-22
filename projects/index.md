---
layout: default
title: Projects
permalink: /projects/
description: A collection of software development projects documented from start to finish.
---

<div class="projects-page">
  <div class="container mx-auto px-4 py-12">
    <!-- Page Header -->
    <header class="max-w-3xl mb-12">
      <h1 class="text-4xl font-bold text-dark-primary mb-4">{{ page.title }}</h1>
      <p class="text-xl text-dark-text-secondary">{{ page.description }}</p>
    </header>
    
    <!-- Projects List -->
    <div class="project-grid">
      {% assign projects = site.projects | sort: 'position' %}
      {% if projects.size > 0 %}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {% for project in projects %}
            {% include components/project-card.html 
              title=project.title 
              description=project.description 
              status=project.status 
              link=project.url 
              link_text="View Project"
              technologies=project.technologies
              image=project.image
            %}
          {% endfor %}
        </div>
      {% else %}
        <div class="bg-dark-surface rounded-lg p-8 text-center">
          <p class="text-dark-text-secondary mb-4">No projects available yet. Check back soon!</p>
          
          <p class="text-dark-text-secondary text-sm">
            Projects will be added as they are developed. Each project will include a timeline, technical challenges, and lessons learned.
          </p>
        </div>
      {% endif %}
    </div>
  </div>
</div> 