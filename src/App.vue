<script setup lang="ts">
import AnalysisForm from './components/AnalysisForm.vue';
import InfoSection from './components/InfoSection.vue';
import Header from './components/Header.vue';
import { useAnalysis } from './composables/useAnalysis';

const { result, analyzeContent } = useAnalysis();

async function handleAnalyze(text: string) {
  result.value = await analyzeContent(text);
}
</script>

<template>


  <Header />

  <div class="min-h-screen pt-24 pb-4 px-4 text-white relative mb-3">
    <div>
      <div class="text-center mb-6">
        <h1 class="font-display text-6xl font-bold mb-6 relative">
          <span class="bg-gradient-to-r from-cyan-300 via-blue-500 to-cyan-300 bg-clip-text text-transparent animate-gradient animate-fadeIn">TruthLens</span>
        </h1>
        <p class="text-lg text-blue-200/80 font-display tracking-wide animate-fadeIn">Analyze news articles for bias and credibility</p>
      </div>
      
      <AnalysisForm class="animate-fadeInUp" @analyze="handleAnalyze" />
      <InfoSection />
    </div>
  </div>
</template>
