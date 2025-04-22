---
layout: page
title: Projects
permalink: /projects/
---

Below is a collection of my ongoing and completed projects. Each project includes a timeline of development, technical challenges, and key milestones.

{% assign sorted_projects = site.projects | sort: 'start_date' | reverse %}

<div class="projects-grid">
  {% for project in sorted_projects %}
    <div class="project-card">
      <h2><a href="{{ project.url }}">{{ project.title }}</a></h2>
      <p>{{ project.description }}</p>
      <div class="project-meta">
        <span class="project-date">Started: {{ project.start_date | date: "%B %Y" }}</span>
        <span class="project-status {{ project.status }}">{{ site.data.statuses[project.status].label }}</span>
      </div>
      <div class="project-technologies">
        {% for tech in project.technologies %}
          <span class="tech-badge">{{ tech }}</span>
        {% endfor %}
      </div>
    </div>
  {% endfor %}
</div>

{% if sorted_projects.size == 0 %}
<p>No projects available yet. Check back soon!</p>
{% endif %} 