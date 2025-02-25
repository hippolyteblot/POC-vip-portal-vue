<script setup lang="ts">
import { useRouter } from 'vue-router';

interface Props {
  title: string;
  version: string;
  pipeline: string;
  tags: string[];
}

const router = useRouter();

const props = defineProps<Props>();

const goToLaunch = () => {
  router.push({ name: 'launch', params: { pipeline: props.pipeline } });
};
</script>

<template>
  <div 
    class="bg-white shadow-md rounded-lg p-4 text-center border border-gray-300 flex flex-col items-center justify-center w-48 h-48 cursor-pointer application-card"
    @click="goToLaunch"
  >
    <font-awesome-icon icon="cube" class="text-blue-600 fa-4x" />
    <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
    <p class="text-gray-600 text-sm">Version : {{ version }}</p>

    <div class="mt-3">
      <span v-for="(tag, index) in tags" :key="index"
            class="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mr-1">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.application-card {
  transition: background-color 0.3s;
}

.application-card:hover {
  background-color: #d6d6d6;
}
</style>
