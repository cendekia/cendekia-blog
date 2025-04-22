---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: Cendekia - A Developer's Journey
description: Documenting the process of building projects from scratch and sharing technical insights
---

## Building in Public

Welcome to my development journal. Here, I document the entire process of building software projects from conception to completion. Each project includes:

- A detailed timeline of development
- Technical challenges and their solutions
- Weekly updates on progress
- Code snippets and explanations

My goal is to provide an authentic look at the software development process, sharing both successes and challenges along the way.

## Development Timeline

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
