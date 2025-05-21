<script setup lang="ts">
const links = [
  { name: 'Analyze', href: '#' },
  { name: 'Docs', href: '#' },
  { name: 'Help', href: '#' }
];
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl">
    <nav class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="my-4 px-4 h-8 rounded-full flex items-center justify-between shadow-sm">
        <div class="flex items-center space-x-3">
          <img
            src="../assets/logo.png"
            alt="TruthLens Logo"
            class="h-8 w-auto object-contain"
          />
        </div>


        <div class="flex items-center space-x-6">
          <a v-for="link in links" :key="link.name" :href="link.href"
            class="text-sm text-blue-200/80 hover:text-white transition-colors duration-200">
            {{ link.name }}
          </a>
          <a href="https://bolt.new" target="_blank" rel="noopener noreferrer"
            class="flex items-center space-x-1 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
            <span>Made with Bolt</span>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>