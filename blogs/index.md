---
layout: default
title: Blog
permalink: /blogs/
description: Articles documenting project development, technical challenges, and lessons learned.
---

<div class="blog-page">
  <div class="container mx-auto px-4 py-12">
    <!-- Page Header -->
    <header class="max-w-3xl mb-12">
      <h1 class="text-4xl font-bold text-dark-primary mb-4">{{ page.title }}</h1>
      <p class="text-xl text-dark-text-secondary">{{ page.description }}</p>
    </header>
    
    <!-- Blog Posts -->
    <div class="max-w-4xl">
      {% if site.posts.size > 0 %}
        <div class="space-y-10">
          {% for post in site.posts %}
            <article class="bg-dark-surface rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <div class="mb-2 flex items-center">
                <span class="text-sm text-dark-text-secondary">{{ post.date | date: "%B %d, %Y" }}</span>
                
                {% if post.categories.size > 0 %}
                  <span class="mx-2 text-dark-text-disabled">•</span>
                  <div class="flex space-x-2">
                    {% for category in post.categories %}
                      <span class="px-2 py-1 text-xs rounded-full bg-dark-primary/10 text-dark-primary">{{ category }}</span>
                    {% endfor %}
                  </div>
                {% endif %}
              </div>
              
              <h2 class="text-2xl font-bold text-dark-text-primary mb-3">
                <a href="{{ post.url | relative_url }}" class="hover:text-dark-primary transition-colors">{{ post.title }}</a>
              </h2>
              
              <div class="text-dark-text-secondary mb-4">
                {{ post.excerpt | strip_html | truncatewords: 50 }}
              </div>
              
              <div class="flex justify-between items-center">
                <a href="{{ post.url | relative_url }}" class="inline-flex items-center text-dark-primary hover:text-dark-secondary transition-colors">
                  Read more
                  <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
                
                {% if post.project %}
                  <a href="{{ '/projects/' | append: post.project | relative_url }}" class="text-sm text-dark-text-secondary hover:text-dark-primary transition-colors">
                    Related project: {{ post.project }}
                  </a>
                {% endif %}
              </div>
            </article>
          {% endfor %}
        </div>
      {% else %}
        <div class="bg-dark-surface rounded-lg p-8 text-center">
          <p class="text-dark-text-secondary mb-4">No blog posts yet. Check back soon!</p>
          
          <p class="text-dark-text-secondary text-sm">
            Blog posts will be published regularly to document the development process of various projects.
          </p>
        </div>
      {% endif %}
    </div>
  </div>
</div> 