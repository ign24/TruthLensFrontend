<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

interface Message {
  id: string;
  text: string;
  isAi: boolean;
  isTyping?: boolean;
}

interface Props {
  articleText: string;
  analysisResult: {
    factualAccuracy: number;
    bias: string;
    emotionalLevel: string;
    recommendation: string;
  };
}

const props = defineProps<Props>();
const emit = defineEmits(['close']);

const isOpen = ref(false);
const messages = ref<Message[]>([]);
const newMessage = ref('');
const messageContainer = ref<HTMLElement | null>(null);
const isAiTyping = ref(false);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    emit('close');
  }
};

const scrollToBottom = async () => {
  await nextTick();
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

const addMessage = async (text: string, isAi: boolean) => {
  const message: Message = {
    id: crypto.randomUUID(),
    text,
    isAi,
    isTyping: isAi
  };
  
  messages.value.push(message);
  await scrollToBottom();
  
  if (isAi) {
    isAiTyping.value = true;
    // Simulate typing effect
    await new Promise(resolve => setTimeout(resolve, 1000));
    message.isTyping = false;
    isAiTyping.value = false;
    await scrollToBottom();
  }
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  
  const userMessage = newMessage.value;
  newMessage.value = '';
  
  await addMessage(userMessage, false);
  
  // TODO: Replace with actual API call
  // const response = await fetch('/api/chat', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     message: userMessage,
  //     articleText: props.articleText,
  //     analysisResult: props.analysisResult
  //   })
  // });
  // const data = await response.json();
  
  // Placeholder response
  await addMessage("I understand your question about the article. Based on our analysis, I can help provide more context about the bias and factual accuracy we detected.", true);
};

onMounted(() => {
  addMessage("Hi! I can help you understand more about the article analysis. What would you like to know?", true);
});
</script>

<template>
  <!-- Chat Toggle Button -->
  <button
    @click="toggleChat"
    class="fixed bottom-6 left-6 z-[100] p-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 
           text-white shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 
           hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
  >
    <span v-if="!isOpen" class="flex items-center space-x-2">
      <span class="text-sm">Chat Assistant</span>
    </span>
    <span v-else class="text-sm">Close</span>
  </button>

  <!-- Chat Window -->
  <div
    v-show="isOpen"
    class="fixed bottom-24 left-6 z-[99] w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)]
           rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10
           bg-gradient-to-b from-slate-900/95 to-slate-800/95 shadow-xl"
  >
    <!-- Chat Header -->
    <div class="p-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
      <h3 class="text-lg font-display font-semibold text-white">TruthLens Assistant</h3>
      <p class="text-sm text-blue-200/70">Ask me about the article analysis</p>
    </div>

    <!-- Messages Container -->
    <div
      ref="messageContainer"
      class="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-500/20 
             scrollbar-track-transparent"
    >
      <div
        v-for="message in messages"
        :key="message.id"
        :class="[
          'max-w-[80%] rounded-lg p-3 animate-fadeIn',
          message.isAi ? 'bg-blue-500/20 ml-0 mr-auto' : 'bg-white/10 ml-auto mr-0'
        ]"
      >
        <p v-if="message.isTyping" class="text-blue-200 animate-pulse">...</p>
        <p v-else class="text-white text-sm">{{ message.text }}</p>
      </div>
    </div>

    <!-- Input Area -->
    <div class="absolute bottom-0 left-0 right-0 p-4 bg-slate-900/95 border-t border-white/10">
      <form @submit.prevent="sendMessage" class="flex space-x-2">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type your question..."
          class="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white 
                 placeholder-blue-200/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
          :disabled="isAiTyping"
        />
        <button
          type="submit"
          :disabled="!newMessage.trim() || isAiTyping"
          class="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg text-white 
                 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 
                 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>