---
layout: default
title: Components Test
permalink: /components-test/
---

<div class="max-w-4xl mx-auto">
  <h1 class="text-3xl font-bold mb-8 text-dark-primary">Tailwind Components</h1>
  <p class="mb-8 text-dark-text-secondary">This page demonstrates the components created with Tailwind CSS for the Cendekia blog.</p>

  <div class="mb-12">
    <h2 class="text-2xl font-bold mb-4 border-b border-dark-surface pb-2">Buttons</h2>
    <div class="flex flex-wrap gap-4 mb-6">
      {% include components/button.html text="Primary Button" %}
      {% include components/button.html text="Secondary Button" class="bg-dark-secondary text-dark-bg hover:bg-dark-secondary/80" %}
    </div>
    <div class="bg-dark-surface p-4 rounded-lg">
      <p class="text-sm text-dark-text-secondary mb-2">Code example:</p>
      <pre class="text-xs overflow-x-auto"><code>{% raw %}{% include components/button.html text="Primary Button" %}{% endraw %}</code></pre>
    </div>
  </div>

  <div class="mb-12">
    <h2 class="text-2xl font-bold mb-4 border-b border-dark-surface pb-2">Cards</h2>
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      {% include components/card.html 
        title="Sample Card" 
        description="This is a sample card component built with Tailwind CSS."
        link="#" 
        link_text="Read More" 
      %}
      
      {% include components/card.html 
        title="Project Card" 
        description="A card that could be used for showcasing projects."
        link="#" 
        link_text="View Project" 
      %}
    </div>
    <div class="bg-dark-surface p-4 rounded-lg">
      <p class="text-sm text-dark-text-secondary mb-2">Code example:</p>
      <pre class="text-xs overflow-x-auto"><code>{% raw %}{% include components/card.html 
  title="Sample Card" 
  description="This is a sample card component built with Tailwind CSS."
  link="#" 
  link_text="Read More" 
%}{% endraw %}</code></pre>
    </div>
  </div>

  <div class="mb-12">
    <h2 class="text-2xl font-bold mb-4 border-b border-dark-surface pb-2">Badges</h2>
    <div class="flex flex-wrap gap-3 mb-6">
      {% include components/badge.html text="New" type="primary" %}
      {% include components/badge.html text="Updated" type="secondary" %}
      {% include components/badge.html text="Error" type="error" %}
      {% include components/badge.html text="Default" %}
    </div>
    <div class="bg-dark-surface p-4 rounded-lg">
      <p class="text-sm text-dark-text-secondary mb-2">Code example:</p>
      <pre class="text-xs overflow-x-auto"><code>{% raw %}{% include components/badge.html text="New" type="primary" %}{% endraw %}</code></pre>
    </div>
  </div>
</div> 