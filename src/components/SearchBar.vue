<script setup lang="ts">
import { defineEmits } from "vue";

const props = defineProps<{ searchQuery: string }>();
const emit = defineEmits(["update:searchQuery"]);
</script>

<template>
  <div class="flex justify-center mt-4 w-full text-xl">
    <input
      :value="searchQuery"
      @input="(e) => emit('update:searchQuery', (e.target as HTMLInputElement).value)"
      type="text"
      class="border p-2 w-1/2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
      placeholder="🔍 Rechercher une application..."
    />
  </div>
</template>
