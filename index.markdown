---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: Cendekia - A Developer's Journey
description: Documenting the process of building projects from scratch and sharing technical insights
---

# Welcome to Cendekia

Documenting the process of building projects from scratch, sharing technical challenges, and tracking progress through a visual timeline.

## Featured Projects

{% assign featured_projects = site.projects | where: "featured", true %}
{% if featured_projects.size > 0 %}
<div class="featured-projects">
  {% for project in featured_projects limit:3 %}
    <div class="project-card">
      <h3><a href="{{ project.url }}">{{ project.title }}</a></h3>
      <p>{{ project.description }}</p>
      <div class="project-status {{ project.status }}">{{ site.data.statuses[project.status].label }}</div>
    </div>
  {% endfor %}
</div>
{% else %}
<p>No featured projects yet. Check back soon!</p>
{% endif %}

## Recent Posts

{% for post in site.posts limit:5 %}
  <div class="post-item">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
    <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
  </div>
{% endfor %}
