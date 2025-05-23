<script setup lang="ts">
import { ref } from 'vue';

interface ToneInfo {
  name: string;
  color: string;
  description: string;
  bgColor: string;
  borderColor: string;
  hoverBg: string;
}

const tones: ToneInfo[] = [
  {
    name: 'Alarmist',
    color: 'text-red-400',
    description: 'Uses urgent, dramatic language to create fear or panic',
    bgColor: 'bg-red-950/30',
    borderColor: 'border-red-400/20',
    hoverBg: 'hover:bg-red-900/40'
  },
  {
    name: 'Neutral',
    color: 'text-blue-400',
    description: 'Presents information in an objective, balanced way',
    bgColor: 'bg-blue-950/30',
    borderColor: 'border-blue-400/20',
    hoverBg: 'hover:bg-blue-900/40'
  },
  {
    name: 'Emotional',
    color: 'text-purple-400',
    description: 'Appeals to feelings rather than facts',
    bgColor: 'bg-purple-950/30',
    borderColor: 'border-purple-400/20',
    hoverBg: 'hover:bg-purple-900/40'
  },
  {
    name: 'Political',
    color: 'text-orange-400',
    description: 'Shows partisan bias or political agenda',
    bgColor: 'bg-orange-950/30',
    borderColor: 'border-orange-400/20',
    hoverBg: 'hover:bg-orange-900/40'
  },
  {
    name: 'Ambiguous',
    color: 'text-gray-400',
    description: 'Uses vague or unclear language that could be misleading',
    bgColor: 'bg-gray-950/30',
    borderColor: 'border-gray-400/20',
    hoverBg: 'hover:bg-gray-900/40'
  }
];

const hoveredTone = ref<string | null>(null);

const setHoveredTone = (toneName: string | null) => {
  hoveredTone.value = toneName;
};
</script>

<template>
  <div class="flex flex-wrap gap-3 justify-center items-center">
    <div
      v-for="tone in tones"
      :key="tone.name"
      class="relative group"
      @mouseenter="setHoveredTone(tone.name)"
      @mouseleave="setHoveredTone(null)"
    >
      <div
        class="flex items-center px-4 py-2 rounded-lg border backdrop-blur-sm transition-all duration-300 cursor-pointer"
        :class="[
          tone.bgColor,
          tone.borderColor,
          tone.hoverBg,
          'group-hover:scale-105',
          'group-hover:shadow-lg',
          `group-hover:shadow-${tone.color}/10`
        ]"
      >
        <span :class="[tone.color, 'font-medium']">{{ tone.name }}</span>
      </div>

      <!-- Tooltip -->
      <div
        class="absolute -top-12 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm
               opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 w-48 text-center
               pointer-events-none backdrop-blur-md border border-white/10"
        :class="[tone.bgColor]"
      >
        {{ tone.description }}
        <div 
          class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2"
          :class="[tone.bgColor]"
        ></div>
      </div>
    </div>
  </div>
</template>