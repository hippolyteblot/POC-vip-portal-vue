<script setup lang="ts">
import { ref } from 'vue';

interface InputField {
  name: string;
}

const applications = ['App A', 'App B', 'App C'];
const selectedApp = ref<string | null>(null);
const inputs = ref<InputField[]>([]);

const updateInputs = () => {
  switch (selectedApp.value) {
    case 'App A':
      inputs.value = [{ name: 'Paramètre 1' }, { name: 'Paramètre 2' }];
      break;
    case 'App B':
      inputs.value = [{ name: 'Option X' }, { name: 'Option Y' }];
      break;
    default:
      inputs.value = [];
  }
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Lancer une exécution</h1>

    <label class="block mt-4">Sélectionnez une application :</label>
    <select v-model="selectedApp" @change="updateInputs" class="border p-2 mt-2">
      <option disabled value="">Choisissez...</option>
      <option v-for="app in applications" :key="app" :value="app">{{ app }}</option>
    </select>

    <div v-if="inputs.length" class="mt-4">
      <div v-for="(input, index) in inputs" :key="index">
        <label>{{ input.name }} :</label>
        <input type="text" class="border p-2 w-full mt-2" />
      </div>
      <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Lancer</button>
    </div>
  </div>
</template>
